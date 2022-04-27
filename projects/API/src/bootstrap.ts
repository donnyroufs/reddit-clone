import "dotenv/config"
import "reflect-metadata"
import "./KondahHacks"

import { Energizor } from "@kondah/energizor"

import { Application } from "./Application"
import { ExpressHttpAdapter } from "@kondah/express-adapter"

export async function bootstrap(energizor: Energizor) {
  const app = new Application({
    httpDriver: ExpressHttpAdapter,
    energizor,
  })

  await app.boot()

  return app
}

if (process.env.NODE_ENV !== "test") {
  bootstrap(new Energizor())
}
