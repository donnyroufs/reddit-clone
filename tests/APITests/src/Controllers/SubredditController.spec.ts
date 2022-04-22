import { ExcludeHooks, TestableEnergizor } from "@kondah/energizor"
import { Server } from "http"
import supertest from "supertest"

import { bootstrap } from "@rclone/api"
import { CreateSubredditDto } from "@rclone/bll"
import { Database } from "@rclone/dal"

@Describe()
export class SubredditControllerSpec {
  private _server: Server
  private _database: ExcludeHooks<Database>
  private _di: TestableEnergizor

  @BeforeAll()
  public async setup() {
    this._di = new TestableEnergizor()

    const api = await bootstrap(this._di)

    this._database = this._di.get(Database)

    this._server = api.getServerInstance()
  }

  @AfterAll()
  public async destroy() {
    this._server.close()
    await this._database.getClient().destroy()
  }

  @AfterEach()
  public async cleanup() {
    await this._database.getClient().deleteFrom("subreddit").execute()
  }

  @Test()
  public async CreatesASubreddit() {
    const res = await supertest(this._server)
      .post("/subreddit")
      .send(new CreateSubredditDto("woof", "description", "userId"))

    const verificationRes = await supertest(this._server)
      .get("/subreddit?page=0&limit=1")
      .send()

    expect(res.status).toBe(201)
    expect(res.body.name).toBe("woof")

    expect(verificationRes.body.subreddits.at(0).name).toBe("woof")
  }

  @Test()
  public async ReturnsAnEmptyArrayWhenNoSubreddits() {
    const res = await supertest(this._server)
      .get("/subreddit?page=0&limit=1")
      .send()

    expect(res.body.subreddits.length).toBe(0)
    expect(res.body.hasMore).toBe(false)
    expect(res.statusCode).toBe(200)
  }

  @Test()
  public async ReturnsOneSubredditAndHasNoMore() {
    await supertest(this._server)
      .post("/subreddit")
      .send(new CreateSubredditDto("woof", "description", "userId"))

    const res = await supertest(this._server)
      .get("/subreddit?page=0&limit=1")
      .send()

    expect(res.body.subreddits.length).toBe(1)
    expect(res.body.hasMore).toBe(false)
    expect(res.statusCode).toBe(200)
  }

  @Test()
  public async ReturnsTwoSubredditsAndHasMore() {
    await supertest(this._server)
      .post("/subreddit")
      .send(new CreateSubredditDto("woof", "description", "userId"))

    await supertest(this._server)
      .post("/subreddit")
      .send(new CreateSubredditDto("woof2", "description", "userId"))

    await supertest(this._server)
      .post("/subreddit")
      .send(new CreateSubredditDto("woof3", "description", "userId"))

    const res = await supertest(this._server)
      .get("/subreddit?page=0&limit=2")
      .send()

    expect(res.body.subreddits.length).toBe(2)
    expect(res.body.hasMore).toBe(true)
    expect(res.statusCode).toBe(200)
  }
}
