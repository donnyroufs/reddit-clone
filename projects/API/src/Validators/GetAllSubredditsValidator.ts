import { Validator } from "fluentvalidation-ts"

import { GetAllSubredditsDto } from "@rclone/bll"

export class GetAllSubredditsValidator extends Validator<GetAllSubredditsDto> {
  public constructor() {
    super()

    this.ruleFor("limit")
      .notNull()
      .must((val) => typeof val === "number")

    this.ruleFor("page")
      .notNull()
      .must((val) => typeof val === "number")
  }
}
