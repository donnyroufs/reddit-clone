import { FunctionComponent } from "react"
import sc from "classnames"

import s from "./Icon.module.scss"

type IconProps = {
  icon: FunctionComponent<any>
  size: number
  className?: string
  onClick: () => void
}

export const Icon = ({ icon: El, size, className, onClick }: IconProps) => (
  <El
    tabIndex="0"
    className={sc(s.icon, className)}
    onClick={onClick}
    style={{
      width: size,
      height: size,
    }}
  />
)
