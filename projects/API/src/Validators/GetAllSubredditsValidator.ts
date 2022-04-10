import { Validator } from "fluentvalidation-ts"

import { IGetAllSubredditsDto } from "@rclone/bll"

export class GetAllSubredditsValidator extends Validator<IGetAllSubredditsDto> {
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
