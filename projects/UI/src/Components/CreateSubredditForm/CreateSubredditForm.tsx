import styles from "./CreateSubredditForm.module.scss"

import { useValues } from "../../Hooks/useValues"
import { useCreateSubreddit } from "../../Mutations/createSubreddit"

export const CreateSubredditForm = () => {
  const [mutate] = useCreateSubreddit()
  const [values, { clear, getPropsForInput }] = useValues({
    name: "",
    description: "",
  })

  function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    mutate(values)
    clear()
  }

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <div>
        <label htmlFor="name">name</label>
        <input type="text" name="name" {...getPropsForInput("name")} />
      </div>
      <div>
        <label htmlFor="description">description</label>
        <input
          type="text"
          name="description"
          {...getPropsForInput("description")}
        />
      </div>
      <button type="submit">create one</button>
    </form>
  )
}
