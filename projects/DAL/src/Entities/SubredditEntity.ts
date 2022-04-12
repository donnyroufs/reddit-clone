export class SubredditEntity {
  public constructor(
    public name: string,
    public description: string,
    public createdAt = new Date().toLocaleDateString(),
    // TODO: Optional Id
    public id?: string
  ) {}
}
