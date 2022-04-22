import { Validator } from "fluentvalidation-ts"
import { CreateSubredditDto } from "@rclone/bll"

export class CreateSubredditDtoValidator extends Validator<CreateSubredditDto> {
  public constructor() {
    super()

    this.ruleFor("name")
      .must((value) => typeof value === "string")
      .minLength(1)
      .maxLength(21)
      .notEmpty()

    this.ruleFor("description")
      .must((value) => typeof value === "string")
      .notEmpty()
  }
}
