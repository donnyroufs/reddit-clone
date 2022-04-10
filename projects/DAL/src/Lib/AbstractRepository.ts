import { Injectable } from "@kondah/energizor"
import { Database } from "../Database"

@Injectable()
export abstract class AbstractRepository {
  public constructor(protected readonly db: Database) {}
}
