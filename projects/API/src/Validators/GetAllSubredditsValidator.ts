import { Validator } from "fluentvalidation-ts"

import { GetAllSubredditsDto } from "@rclone/bll"

export class GetAllSubredditsValidator extends Validator<GetAllSubredditsDto> {
  public constructor() {
    super()

    this.ruleFor("limit")
      .notNull()
      .must((val) => typeof val === "string")

    this.ruleFor("page")
      .notNull()
      .must((val) => typeof val === "string")
  }

  public static fromQuery(val: GetAllSubredditsDto) {
    const validated = new GetAllSubredditsValidator().validate(val)

    if (Object.keys(validated).length > 0) {
      throw new Error(JSON.stringify(validated))
    }

    return val
  }
}
