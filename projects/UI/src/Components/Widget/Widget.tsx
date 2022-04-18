import { ReactNode } from "react"
import s from "./Widget.module.scss"

interface IWidgetProps {
  header: ReactNode
  content: ReactNode
}

export const Widget = ({ header, content }: IWidgetProps) => {
  return (
    <div className={s.widget}>
      <header className={s.widget__header}>{header}</header>
      <div className={s.widget__content}>{content}</div>
    </div>
  )
}
