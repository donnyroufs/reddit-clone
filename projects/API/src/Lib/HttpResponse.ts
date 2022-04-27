export class HttpResponse {
  public constructor(
    public status: number,
    body: Record<string, any>,
    public headers?: Record<string, string>
  ) {
    Object.assign(this, body)
  }
}
