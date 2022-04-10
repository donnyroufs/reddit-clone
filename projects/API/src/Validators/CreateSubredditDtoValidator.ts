import { Validator } from "fluentvalidation-ts"
import { ICreateRedditDto } from "@rclone/bll"

export class CreateSubredditDtoValidator extends Validator<ICreateRedditDto> {
  public constructor() {
    super()

    this.ruleFor("title")
      .must((value) => typeof value === "string")
      .notEmpty()

    this.ruleFor("description")
      .must((value) => typeof value === "string")
      .notEmpty()
  }
}
