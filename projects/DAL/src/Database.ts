import { IBoot } from "@kondah/energizor"
import { Kysely, PostgresDialect } from "kysely"
import { SubredditEntity } from "./Entities/SubredditEntity"

export interface ITables {
  subreddit: SubredditEntity
}

export class Database {
  private _client: Kysely<ITables>

  // TODO: config
  public constructor() {
    this._client = new Kysely({
      dialect: new PostgresDialect({
        host: "localhost",
        database: "reddit",
        user: "postgres",
        password: "postgres",
      }),
    })
  }

  public getClient() {
    return this._client
  }
}
