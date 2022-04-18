import cn from "classnames"

import s from "./CreateSubredditWidgetContent.module.scss"

export const CreateSubredditWidgetContent = () => (
  <div>
    <p className={s.container__text}>
      Your personal Reddit frontpage. Come here to check in with your favorite
      communities.
    </p>
    <footer>
      <button className={cn(s.btn, s["btn--primary"])}>Create Post</button>
      <button className={cn(s.btn, s["btn--secondary"])}>
        Create Community
      </button>
    </footer>
  </div>
)
