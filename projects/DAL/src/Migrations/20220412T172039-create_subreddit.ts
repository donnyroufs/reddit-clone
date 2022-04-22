import { Kysely } from "kysely"
import { ITables } from "../Database"

export async function up(db: Kysely<ITables>): Promise<void> {
  db.schema
    .createTable("subreddit")
    .addColumn("id", "uuid", (col) => col.primaryKey())
    .addColumn("name", "varchar")
    .addColumn("description", "varchar")
    .addColumn("createdAt", "date")
    .addColumn("userId", "varchar")
    .addUniqueConstraint("UQ_name", ["name"])
    .execute()
}

export async function down(db: Kysely<ITables>): Promise<void> {
  db.schema.dropTable("subreddit")
}
