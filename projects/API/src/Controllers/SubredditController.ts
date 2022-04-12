import { Injectable } from "@kondah/energizor"

import {
  SubredditServiceLocator,
  GetAllSubredditsDto,
  CreateSubredditDto,
} from "@rclone/bll"

import { HttpContext } from "../Lib/HttpContext"
import { AbstractController } from "../Lib/AbstractController"

@Injectable()
export class SubredditController extends AbstractController {
  public constructor(
    private readonly _subredditServiceLocator: SubredditServiceLocator
  ) {
    super()
  }

  public async all(ctx: HttpContext<unknown, unknown, GetAllSubredditsDto>) {
    const subreddits =
      await this._subredditServiceLocator.getAllSubredditsUseCase.execute(
        ctx.query
      )

    return this.ok(subreddits)
  }

  public async create(ctx: HttpContext<CreateSubredditDto>) {
    const subreddit =
      await this._subredditServiceLocator.createSubredditUseCase.execute(
        ctx.body
      )

    return this.created(subreddit, `/subreddits/${subreddit.name}`)
  }
}
