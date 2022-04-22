import { useContext } from "react"
import { ModalCtx } from "../Contexts/ModalContext"

export function useModal() {
  const { isOpen, setIsOpen } = useContext(ModalCtx)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  return [
    isOpen,
    {
      openModal,
      closeModal,
    },
  ] as const
}
