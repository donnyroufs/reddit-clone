import { ICollection, IEnergizor } from "@kondah/energizor"

import { APIServer } from "./APIServer"
import { SubredditController } from "./Controllers/SubredditController"

export class APICollection implements ICollection {
  public configureServices(services: IEnergizor): void {
    services.addSingleton(APIServer)
    services.addTransient(SubredditController)
  }
}
