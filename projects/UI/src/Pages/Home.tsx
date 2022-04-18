import { useGetSubreddits } from "../Queries/getSubreddits"
import { CreateSubredditWidget } from "./CreateSubredditWidget/CreateSubredditWidget"
import s from "./Home.module.scss"

export const Home = () => {
  const [subreddits] = useGetSubreddits()

  return (
    <div className={s.container}>
      <div className={s.content}>this is content</div>
      <aside className={s.sidebar}>
        <CreateSubredditWidget />
      </aside>
    </div>
  )
}
