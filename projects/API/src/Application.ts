import { IEnergizor, Kondah } from "@kondah/core"
import cors from "cors"
import { Request, Response, json } from "express"

import { BLLCollection } from "@rclone/bll"
import { DALCollection } from "@rclone/dal"
import { SubredditController } from "./Controllers/SubredditController"

const userId = "6433355e-d10d-45f0-8874-9b34380c4f5d"

export class Application extends Kondah<
  Request,
  Response,
  Express.Application
> {
  public async configureServices(services: IEnergizor) {
    services.addCollection(DALCollection)
    services.addCollection(BLLCollection)

    services.addTransient(SubredditController)
  }

  public async setup(services: IEnergizor): Promise<void> {
    const http = this.getHttpDriver()

    http.addMiddleware(json())

    http.addMiddleware((req, res, next) => {
      req.body.userId = userId
      next()
    })

    http.addMiddleware(
      cors({
        origin: "*",
      })
    )

    await http.run(5000)
  }

  public getServer() {
    return this.getHttpDriver().getServer()
  }
}
