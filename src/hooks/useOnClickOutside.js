import { useRef, useEffect } from "react"

const useOnClickOutside = (callback, disable) => {
  const ref = useRef()

  useEffect(() => {
    const handleClick = (event) => {
      if (
        disable === false &&
        (!ref.current || !ref.current.contains(event.target))
      ) {
        callback(event)
      }
    }

    document.addEventListener("click", handleClick, true)

    return () => {
      document.removeEventListener("click", handleClick, true)
    }
  }, [ref, disable])

  return ref
}

export default useOnClickOutside
