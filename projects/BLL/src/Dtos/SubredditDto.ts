export class SubredditDto {
  public constructor(
    public id: string,
    public name: string,
    public description: string,
    public createdAt: string
  ) {}
}
