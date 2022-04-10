import { Injectable } from "@kondah/energizor"
import { CreateSubredditUseCase } from "./UseCases/CreateSubredditUseCase"
import { GetAllSubredditsUseCase } from "./UseCases/GetAllSubredditsUseCase"

@Injectable()
export class SubredditServiceLocator {
  public constructor(
    public readonly createSubredditUseCase: CreateSubredditUseCase,
    public readonly getAllSubredditsUseCase: GetAllSubredditsUseCase
  ) {}
}
