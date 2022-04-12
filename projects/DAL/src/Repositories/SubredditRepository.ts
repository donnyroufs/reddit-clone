import { Injectable } from "@kondah/energizor"
import { v4 } from "uuid"

import { AbstractRepository } from "../Lib/AbstractRepository"
import { SubredditEntity } from "../Entities/SubredditEntity"
import { IWrite } from "../Interfaces/IWrite"
import { CreateEntityArgs } from "../Interfaces/ICreate"

@Injectable()
export class SubredditRepository
  extends AbstractRepository
  implements IWrite<SubredditEntity>
{
  public async getAllByPage(page = 0, limit = 1) {
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

  public async exists(name: string) {
    const result = await this.db
      .getClient()
      .selectFrom("subreddit")
      .where("name", "=", name)
      .select("id")
      .execute()

    return result.length > 0
  }

  public async create(
    subreddit: CreateEntityArgs<SubredditEntity>
  ): Promise<SubredditEntity> {
    const result = await this.db
      .getClient()
      .insertInto("subreddit")
      .values({
        id: this.generateId(),
        name: subreddit.name,
        description: subreddit.description,
        createdAt: subreddit.createdAt,
      })
      .returningAll()
      .executeTakeFirstOrThrow()

    return this.toBLL(result)
  }

  private toBLL(raw: any) {
    return new SubredditEntity(raw.name, raw.description, raw.createdAt, raw.id)
  }
}
