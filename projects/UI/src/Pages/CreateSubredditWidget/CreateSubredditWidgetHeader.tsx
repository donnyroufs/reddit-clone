import s from "./CreateSubredditWidgetHeader.module.scss"

export const CreateSubredditWidgetHeader = () => (
  <div>
    <div className={s.container__banner}></div>
    <h2 className={s.container__title}>
      <img
        className={s.container__character}
        src="../../../reddit-character.png"
        alt="reddit character"
      />
      <span>Home</span>
    </h2>
  </div>
)
