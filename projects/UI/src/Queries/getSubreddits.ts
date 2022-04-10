import { useQuery } from "react-query"
import { SubredditRepository } from "../Repositories/SubredditRepository"

export function useGetSubreddits(page = 0, limit = 5) {
  const { data, ...rest } = useQuery("subreddits", () =>
    SubredditRepository.getSubreddits(page, limit)
  )

  // TODO: Mapping to model
  return [data, rest] as const
}
