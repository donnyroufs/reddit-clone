import React, { ReactNode, useRef } from "react"
import { createPortal } from "react-dom"
import sc from "classnames"

import { usePortal } from "../../Hooks/usePortal"
import s from "./Modal.module.scss"
import { useOnClickOutside } from "../../Hooks/useOnClickedOutside"
import { useModal } from "../../Hooks/useModal"

const ModalBackground: React.FC = ({ children }) => (
  <div className={s.modal}>{children}</div>
)

export const Modal: React.FC = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null!)
  const [, { closeModal }] = useModal()
  const target = usePortal("modal")

  useOnClickOutside(ref, () => {
    closeModal()
  })

  return createPortal(
    <ModalBackground>
      <div className={sc(s.modal__content, "gray-400")} ref={ref}>
        {children}
      </div>
    </ModalBackground>,
    target
  )
}
