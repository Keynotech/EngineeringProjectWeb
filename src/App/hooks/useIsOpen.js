import { useState } from "react"

function useIsOpen(initValue) {
  const [isOpen, toggleOpen] = useState(initValue)

  const toggle = () => toggleOpen(!isOpen)

  const show = () => {
    toggleOpen(true)
  }

  const hide = () => {
    toggleOpen(false)
  }

  return { isOpen, toggle, hide, show }
}

export default useIsOpen
