import { ICollection, IEnergizor } from "@kondah/energizor"
import { CreateSubredditUseCase } from "./UseCases/CreateSubredditUseCase"
import { SubredditServiceLocator } from "./SubredditServiceLocator"
import { GetAllSubredditsUseCase } from "./UseCases/GetAllSubredditsUseCase"

export class BLLCollection implements ICollection {
  public configureServices(services: IEnergizor): void {
    services.addSingleton(CreateSubredditUseCase)
    services.addSingleton(GetAllSubredditsUseCase)
    services.addSingleton(SubredditServiceLocator)
  }
}
