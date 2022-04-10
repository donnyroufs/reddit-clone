import "dotenv/config"
import "reflect-metadata"

import { Energizor } from "@kondah/energizor"

import { DALCollection } from "@rclone/dal"
import { BLLCollection } from "@rclone/bll"

import { APICollection } from "./APICollection"
import { energizor } from "./Energizor"

export async function bootstrap(services: Energizor) {
  services.addCollection(BLLCollection)
  services.addCollection(DALCollection)
  services.addCollection(APICollection)

  await services.boot()
}

bootstrap(energizor)
