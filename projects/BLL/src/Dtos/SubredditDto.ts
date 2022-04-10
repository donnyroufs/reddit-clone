export class SubredditDto {
  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public createdAt: string
  ) {}
}
