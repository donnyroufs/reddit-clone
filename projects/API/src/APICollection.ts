import { ICollection, IEnergizor } from "@kondah/energizor"

import { SubredditController } from "./Controllers/SubredditController"

export class APICollection implements ICollection {
  public configureServices(services: IEnergizor): void {
    services.addTransient(SubredditController)
  }
}
