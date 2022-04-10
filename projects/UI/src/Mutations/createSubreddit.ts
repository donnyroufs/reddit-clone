import { useMutation, useQueryClient } from "react-query"
import {
  ICreateSubredditRequest,
  SubredditRepository,
} from "../Repositories/SubredditRepository"

export function useCreateSubreddit() {
  const client = useQueryClient()
  const { mutate, ...rest } = useMutation(
    (subreddit: ICreateSubredditRequest) =>
      SubredditRepository.createSubreddit(subreddit),
    {
      onSuccess: () => {
        client.invalidateQueries("subreddits")
      },
    }
  )

  return [mutate, rest] as const
}
