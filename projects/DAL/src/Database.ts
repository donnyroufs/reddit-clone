import { IBoot, Injectable } from "@kondah/energizor"
import { Kysely, PostgresDialect, SqliteDialect } from "kysely"
import { SubredditEntity } from "./Entities/SubredditEntity"

export interface ITables {
  subreddit: SubredditEntity
}

export class Database implements IBoot {
  private _client: Kysely<ITables>

  public constructor() {
    // TODO: config
    this._client = new Kysely({
      dialect: new PostgresDialect({
        host: "localhost",
        database: "reddit",
        user: "postgres",
        password: "postgres",
      }),
    })
  }

  async onBoot(): Promise<void> {
    try {
      await this._client.schema
        .createTable("subreddit")
        .addColumn("id", "uuid", (col) => col.primaryKey())
        .addColumn("title", "varchar")
        .addColumn("description", "varchar")
        .addColumn("createdAt", "date")
        .execute()
    } catch (e) {}
  }

  public getClient() {
    return this._client
  }
}
