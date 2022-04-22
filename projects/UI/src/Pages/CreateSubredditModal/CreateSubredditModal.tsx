import { IoMdClose } from "react-icons/io"

import { Modal } from "../../Components/Modal/Modal"
import s from "./CreateSubredditModal.module.scss"
import { Icon } from "../../Components/Icon/Icon"
import { useModal } from "../../Hooks/useModal"
import { CreateSubredditForm } from "./CreateSubredditForm/CreateSubredditForm"

export const CreateSubredditModal = () => {
  const [isOpen, { closeModal }] = useModal()

  if (!isOpen) {
    return null
  }

  return (
    <Modal>
      <div className={s["create-modal__body"]}>
        <header className={s["create-modal__header"]}>
          <h1 className={s["create-modal__title"]}>Create a community</h1>
          <Icon icon={IoMdClose} size={24} onClick={() => closeModal()} />
        </header>
        <CreateSubredditForm />
      </div>
    </Modal>
  )
}
