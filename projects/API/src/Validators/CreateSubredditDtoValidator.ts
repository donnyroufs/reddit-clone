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

  public static fromBody(val: CreateSubredditDto) {
    const validated = new CreateSubredditDtoValidator().validate(val)

    if (Object.keys(validated).length > 0) {
      throw new Error(JSON.stringify(validated))
    }

    return val
  }
}
