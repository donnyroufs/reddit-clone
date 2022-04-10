import { useGetSubreddits } from "../Queries/getSubreddits"

export const Home = () => {
  const [subreddits] = useGetSubreddits()

  return <pre>{JSON.stringify(subreddits, null, 2)}</pre>
}
