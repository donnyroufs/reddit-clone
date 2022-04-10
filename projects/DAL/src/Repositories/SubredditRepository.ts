import { Injectable } from "@kondah/energizor"
import { v4 } from "uuid"

import { AbstractRepository } from "../Lib/AbstractRepository"
import { SubredditEntity } from "../Entities/SubredditEntity"

@Injectable()
export class SubredditRepository extends AbstractRepository {
  public async getAllByPage(page: number = 0, limit: number = 1) {
    const result = await this.db
      .getClient()
      .selectFrom("subreddit")
      .offset(page * limit)
      .limit(limit)
      .selectAll()
      .execute()

    return result.map(this.toBLL)
  }

  public async getTotal() {
    const result = await this.db.getClient().selectFrom("subreddit").execute()

    return result.length
  }

  public async create(subreddit: SubredditEntity) {
    const result = await this.db
      .getClient()
      .insertInto("subreddit")
      .values({
        id: v4(),
        title: subreddit.title,
        description: subreddit.description,
        createdAt: subreddit.createdAt,
      })
      .returningAll()
      .executeTakeFirstOrThrow()

    return this.toBLL(result)
  }

  private toBLL(raw: any) {
    return new SubredditEntity(
      raw.title,
      raw.description,
      raw.createdAt,
      raw.id
    )
  }
}
