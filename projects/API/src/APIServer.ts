import { IEnergizor } from "@kondah/energizor"
import cors from "cors"
import { once } from "events"
import express from "express"
import { Server } from "http"

import { SubredditController } from "./Controllers/SubredditController"
import AsyncWrapper from "./Lib/AsyncWrapper"
import { RouteAdapter } from "./Lib/RouteAdapter"
import { Prop, Transformer } from "./Lib/Transformer"
import { CreateSubredditDtoValidator } from "./Validators/CreateSubredditDtoValidator"
import { GetAllSubredditsValidator } from "./Validators/GetAllSubredditsValidator"

export class APIServer {
  private _app = express()
  private _server: Server

  public async onSetup(energizor: IEnergizor): Promise<void> {
    this._app.use(cors())
    this._app.use(express.json())
    this.setupRoutes(energizor)

    await this.run()
  }

  public getServerInstance() {
    return this._server
  }

  private setupRoutes(energizor: IEnergizor) {
    this._app.post(
      "/subreddit",
      AsyncWrapper(async (req, res) => {
        const controller = energizor.get(SubredditController)
        const transformer = new Transformer([
          new Prop("name", "string"),
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

    // @ts-expect-error need to implement
    this._app.use((err, req, res, next) => {
      // TODO: Implement with Problem Details
      console.error(err)
      return res.status(400).json({ error: true, message: err.message })
    })
  }

  private async run() {
    this._server = this._app.listen(5000, () =>
      console.log(`Server is running on http://localhost:5000`)
    )

    await once(this._server, "listening")
  }
}
