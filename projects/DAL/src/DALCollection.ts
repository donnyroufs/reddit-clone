import { ICollection, IEnergizor } from "@kondah/energizor"
import { Database } from "./Database"
import { SubredditRepository } from "./Repositories/SubredditRepository"

export class DALCollection implements ICollection {
  public configureServices(services: IEnergizor): void {
    services.addSingleton(Database)
    services.addSingleton(SubredditRepository)
  }
}
