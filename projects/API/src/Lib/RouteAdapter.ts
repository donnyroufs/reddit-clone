import { Request, Response } from "express"
import { Validator } from "fluentvalidation-ts"
import { Transformer } from "./Transformer"
import { HttpContext } from "./HttpContext"
import { HttpResponse } from "./HttpResponse"

const userId = "6433355e-d10d-45f0-8874-9b34380c4f5d"

export class RouteAdapter {
  public constructor(
    private _validator: Validator<any>,
    private _action: (ctx: HttpContext<any, any, any>) => Promise<HttpResponse>
  ) {}

  public adapt(
    toValidate: "body" | "query" | "params",
    transformer?: Transformer
  ) {
    return async (req: Request, res: Response) => {
      if (transformer) {
        req[toValidate] = transformer.transform(req[toValidate])
      }

      const validated = this._validator.validate(req[toValidate])

      if (Object.keys(validated).length > 0) {
        throw new Error(JSON.stringify(validated))
      }

      // TODO: Replace with authentication
      req.body.userId = userId

      const httpContext = new HttpContext<any>(
        req,
        res,
        req.body,
        req.params,
        req.query
      )

      const response = await this._action(httpContext)

      return res.status(response.status).json(response.body)
    }
  }
}
