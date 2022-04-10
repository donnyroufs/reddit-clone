export class HttpResponse {
  public constructor(
    public status: number,
    public body: Record<string, any>,
    public headers: Record<string, string> = {}
  ) {}
}
