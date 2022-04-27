import { CreateSubredditDto } from "@rclone/bll"

export class CreateSubredditTransformer {
  public static transform(val: CreateSubredditDto) {
    return {
      name: val.name,
      userId: val.userId,
      description: val.description,
    }
  }
}
