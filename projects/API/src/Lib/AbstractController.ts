import { Injectable } from "@kondah/energizor"
import { HttpResponse } from "./HttpResponse"

@Injectable()
export abstract class AbstractController {
  protected ok(body: Record<string, any>) {
    return new HttpResponse(200, body)
  }

  protected created(body: Record<string, any>, location: string) {
    return new HttpResponse(201, body, { location })
  }
}
