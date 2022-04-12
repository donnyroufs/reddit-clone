import { SubredditEntity } from "@rclone/dal"

export class SubredditDto {
  public constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: string
  ) {}

  public static toPersistence(self: SubredditDto): SubredditEntity {
    return new SubredditEntity(
      self.name,
      self.description,
      self.createdAt,
      self.id
    )
  }

  public static fromPersistence(entity: SubredditEntity): SubredditDto {
    return new SubredditDto(
      entity.id!,
      entity.name,
      entity.description,
      entity.createdAt
    )
  }
}
