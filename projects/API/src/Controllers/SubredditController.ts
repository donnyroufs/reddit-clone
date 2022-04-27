import {
  SubredditServiceLocator,
  GetAllSubredditsDto,
  CreateSubredditDto,
} from "@rclone/bll"
import {
  Body,
  Controller,
  Get,
  HttpStatusCode,
  Post,
  Query,
} from "@kondah/core"

import { AbstractController } from "../Lib/AbstractController"
import { GuardAllQuery, GuardCreateBody } from "../Guards/SubredditGuards"

@Controller("/subreddit")
export class SubredditController extends AbstractController {
  public constructor(
    private readonly _subredditServiceLocator: SubredditServiceLocator
  ) {
    super()
  }

  @Get("/", HttpStatusCode.OK)
  public async all(
    @Query(GuardAllQuery)
    query: GetAllSubredditsDto
  ) {
    const subreddits =
      await this._subredditServiceLocator.getAllSubredditsUseCase.execute(query)

    return this.ok(subreddits)
  }

  @Post("/", HttpStatusCode.CREATED)
  public async create(@Body(GuardCreateBody) body: CreateSubredditDto) {
    const subreddit =
      await this._subredditServiceLocator.createSubredditUseCase.execute(body)

    return this.created(subreddit, `/subreddits/${subreddit.name}`)
  }
}
