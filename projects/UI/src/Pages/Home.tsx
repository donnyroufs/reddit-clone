import s from "./Home.module.scss"
import { useGetSubreddits } from "../Queries/getSubreddits"
import { CreateSubredditModal } from "./CreateSubredditModal/CreateSubredditModal"
import { CreateSubredditWidget } from "./CreateSubredditWidget/CreateSubredditWidget"

export const Home = () => {
  const [subreddits] = useGetSubreddits()

  return (
    <div className={s.container}>
      <div className={s.content}>this is content</div>
      <aside className={s.sidebar}>
        <CreateSubredditModal />
        <CreateSubredditWidget />
      </aside>
    </div>
  )
}
