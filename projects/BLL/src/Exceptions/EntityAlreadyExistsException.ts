import { BaseException } from "./BaseException"

export class EntityAlreadyExistsException extends BaseException.mixin(
  "Entity already exists."
) {}
