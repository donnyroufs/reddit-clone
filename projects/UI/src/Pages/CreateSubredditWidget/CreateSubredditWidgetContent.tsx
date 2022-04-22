import cn from "classnames"
import { useModal } from "../../Hooks/useModal"

import s from "./CreateSubredditWidgetContent.module.scss"

export const CreateSubredditWidgetContent = () => {
  const [, { openModal }] = useModal()

  return (
    <div>
      <p className={s.container__text}>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities.
      </p>
      <footer>
        <button className={cn(s.btn, s["btn--primary"])}>Create Post</button>
        <button
          className={cn(s.btn, s["btn--secondary"])}
          onClick={() => openModal()}
        >
          Create Community
        </button>
      </footer>
    </div>
  )
}
