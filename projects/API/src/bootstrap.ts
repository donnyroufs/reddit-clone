import "dotenv/config"
import "reflect-metadata"

import { Energizor } from "@kondah/energizor"

import { Application } from "./Application"

export async function bootstrap(energizor: Energizor) {
  const app = new Application(energizor)

  await app.boot()

  return app.getApiClient()
}

if (process.env.NODE_ENV !== "test") {
  bootstrap(new Energizor())
}
