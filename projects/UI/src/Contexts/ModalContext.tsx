import * as React from "react"

interface IModalContext {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalCtx = React.createContext<IModalContext>(null!)

export const ModalProvider: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalCtx.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ModalCtx.Provider>
  )
}
