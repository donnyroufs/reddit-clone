import { Injectable } from "@kondah/energizor"
import { v4 } from "uuid"
import { Database } from "../Database"

@Injectable()
export abstract class AbstractRepository {
  public constructor(protected readonly db: Database) {}

  protected generateId(): string {
    return v4()
  }
}
