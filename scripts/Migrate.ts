import { run } from "kysely-migration-cli"
import {
  Kysely,
  Migrator,
  PostgresDialect,
  FileMigrationProvider,
} from "kysely"
import path from "path"

const migrationsPath = path.join(__dirname, "../projects/DAL/src/Migrations")

// TODO: Move(duplication), and config
const db = new Kysely({
  dialect: new PostgresDialect({
    host: "localhost",
    database: "reddit",
    user: "postgres",
    password: "postgres",
  }),
})

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider(migrationsPath),
})

run(db, migrator, migrationsPath)
