import { Request, Response } from "express"

export class HttpContext<T, Params = unknown, Query = unknown> {
  public constructor(
    public req: Request,
    public res: Response,
    public body: T,
    public params: Params,
    public query: Query
  ) {}
}
