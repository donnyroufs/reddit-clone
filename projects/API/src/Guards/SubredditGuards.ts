import { flow } from "lodash"

import { CreateSubredditTransformer } from "../Transformers/CreateSubredditTransformer"
import { GetAllSubredditsTransformer } from "../Transformers/GetAllSubredditsTransformer"
import { CreateSubredditDtoValidator } from "../Validators/CreateSubredditDtoValidator"
import { GetAllSubredditsValidator } from "../Validators/GetAllSubredditsValidator"

export const GuardAllQuery = flow(
  GetAllSubredditsValidator.fromQuery,
  GetAllSubredditsTransformer.transform
)

export const GuardCreateBody = flow(
  CreateSubredditDtoValidator.fromBody,
  CreateSubredditTransformer.transform
)
