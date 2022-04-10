import { NextFunction, Request, Response } from "express"

export default (handler: (req: Request, res: Response) => any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res)
    } catch (err) {
      return next(err)
    }
  }
}
