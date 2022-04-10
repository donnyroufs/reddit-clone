import { IBoot, Injectable } from "@kondah/energizor"
import cors from "cors"
import { once } from "events"
import express from "express"
import { Server } from "http"

import { energizor } from "./Energizor"
import { SubredditController } from "./Controllers/SubredditController"
import AsyncWrapper from "./Lib/AsyncWrapper"
import { RouteAdapter } from "./Lib/RouteAdapter"
import { Prop, Transformer } from "./Lib/Transformer"
import { CreateSubredditDtoValidator } from "./Validators/CreateSubredditDtoValidator"
import { GetAllSubredditsValidator } from "./Validators/GetAllSubredditsValidator"

@Injectable()
export class APIServer implements IBoot {
  private _app = express()
  private _server: Server

  public async onBoot(): Promise<void> {
    this._app.use(cors())
    this._app.use(express.json())
    this.setupRoutes()
    await this.run()
  }

  public getServerInstance() {
    return this._server
  }

  private setupRoutes() {
    this._app.post(
      "/subreddit",
      AsyncWrapper(async (req, res) => {
        const controller = energizor.get(SubredditController)
        const transformer = new Transformer([
          new Prop("title", "string"),
          new Prop("description", "string"),
        ])
        const adapter = new RouteAdapter(
          new CreateSubredditDtoValidator(),
          controller.create.bind(controller)
        )

        return adapter.adapt("body", transformer)(req, res)
      })
    )

    this._app.get(
      "/subreddit",
      AsyncWrapper(async (req, res) => {
        const controller = energizor.get(SubredditController)
        const adapter = new RouteAdapter(
          new GetAllSubredditsValidator(),
          controller.all.bind(controller)
        )

        const transformer = new Transformer([
          new Prop("page", "number"),
          new Prop("limit", "number"),
        ])

        return adapter.adapt("query", transformer)(req, res)
      })
    )
  }

  private async run() {
    this._server = this._app.listen(5000, () =>
      console.log(`Server is running on http://localhost:5000`)
    )

    await once(this._server, "listening")
  }
}
