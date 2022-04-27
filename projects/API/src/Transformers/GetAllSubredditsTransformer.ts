import { GetAllSubredditsDto } from "@rclone/bll"

export class GetAllSubredditsTransformer {
  public static transform(val: GetAllSubredditsDto) {
    const parsed = Object.entries(val).reduce((acc: any, curr: any) => {
      const [k, v] = curr

      acc[k] = Number(v)

      return acc
    }, {})

    return parsed
  }
}
