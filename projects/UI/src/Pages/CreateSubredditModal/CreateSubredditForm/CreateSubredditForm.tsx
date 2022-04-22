import { useState, useRef } from "react"
import { BeatLoader } from "react-spinners"
import cn from "classnames"

import { useModal } from "../../../Hooks/useModal"
import s from "./CreateSubredditForm.module.scss"
import { useCreateSubreddit } from "../../../Mutations/createSubreddit"

const MAX_CHARACTERS = 21

export const CreateSubredditForm = () => {
  const [name, setName] = useState("")
  const [mutate, { isLoading, isError }] = useCreateSubreddit()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null!)

  const [, { closeModal }] = useModal()

  const charactersRemaining = MAX_CHARACTERS - name.length

  function handleOnNameChange(value: string) {
    if (value.length - 1 === MAX_CHARACTERS) return

    setName(value)
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (name.length === 0) {
      inputRef.current!.focus()

      return
    }

    mutate(
      {
        name,
        description: "default description",
      },
      {
        onError(err: any) {
          const { message } = err.response.data
          let formattedMessage = "Something bad happend."

          if (message.includes("Entity")) {
            formattedMessage = `Sorry, ${name} is taken. Try another.`
          }

          setErrorMessage(formattedMessage)
        },
        onSuccess() {
          // TODO: Navigate to created subreddit
          closeModal()
        },
      }
    )
  }
  return (
    <form onSubmit={onSubmit}>
      <div className={cn(s.form__inner, "flow")}>
        <label htmlFor="name" className={s.form__label}>
          Name
        </label>
        <p className={cn(s.form__info)}>
          Community names including capitalization cannot be changed.
        </p>
        <div className={s.wrapper}>
          <input
            ref={inputRef}
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => handleOnNameChange(e.target.value)}
            className={s.form__input}
          />
          <span className={s.form__prefix}>r/</span>
        </div>
        <div className={s.form__characters}>
          {charactersRemaining} characters remaining
        </div>
        {isError && <div className={s.form__error}>{errorMessage}</div>}
      </div>
      <footer className={cn(s.form__footer, "p-2")}>
        <button
          className={cn(s.btn, s["btn--secondary"])}
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button className={cn(s.btn, s["btn--primary"])} disabled={isLoading}>
          {isLoading && <BeatLoader color="#707070" />}
          {!isLoading && <>Create Community</>}
        </button>
      </footer>
    </form>
  )
}
