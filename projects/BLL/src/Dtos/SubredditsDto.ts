import { SubredditDto } from "./SubredditDto"

export class SubredditsDto {
  public constructor(
    public subreddits: SubredditDto[],
    public hasMore: boolean
  ) {}
}
