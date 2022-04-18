import { SubredditEntity } from "@rclone/dal"

export class CreateSubredditDto {
  public constructor(
    public name: string,
    public description: string,
    public userId: string
  ) {}

  public static toPersistence(self: CreateSubredditDto): SubredditEntity {
    return new SubredditEntity(self.name, self.description, self.userId)
  }
}
