import { IEnergizor, Kondah } from "@kondah/core"
import { Energizor } from "@kondah/energizor"

import { BLLCollection } from "@rclone/bll"
import { DALCollection } from "@rclone/dal"
import { APIServer } from "./APIServer"
import { SubredditController } from "./Controllers/SubredditController"

export class Application extends Kondah {
  private _api: APIServer

  public constructor(energizor: Energizor) {
    super()

    // @ts-expect-error kondah core is in the middle of a re-write
    this._energizor = energizor
  }

  public async configureServices(services: IEnergizor) {
    services.addCollection(DALCollection)
    services.addCollection(BLLCollection)

    services.addTransient(SubredditController)
  }

  public async setup(services: IEnergizor): Promise<void> {
    this._api = new APIServer()

    await this._api.onSetup(services)
  }

  public getApiClient() {
    return this._api
  }
}
