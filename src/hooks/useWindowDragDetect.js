/* eslint-disable no-unused-vars */
/* eslint-disable func-names */

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  onDragLeave,
  onDragEnter,
} from "../store/features/windowDragEnterSlice"

function useWindowDragDetect() {
  const dispatch = useDispatch()

  const _onDragEnter = () => {
    dispatch(onDragEnter())
  }
  const _onDragLeave = () => {
    dispatch(onDragLeave())
  }

  useEffect(() => {
    const handleDragEnter = (e) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("enter")
      _onDragEnter()
    }
    const handleDragLeave = (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (!e.fromElement) {
        console.log("leave")
        _onDragLeave()
      }
    }
    const handleDropInvalid = (e) => {
      e.preventDefault()
      _onDragLeave()
    }

    document.addEventListener("dragleave", (e) => handleDragLeave(e))

    document.addEventListener("dragenter", (e) => handleDragEnter(e))

    document.addEventListener("drop", (e) => handleDropInvalid(e))

    return () => {
      document.removeEventListener("dragleave", (e) => handleDragLeave(e))
      document.removeEventListener("dragenter", (e) => {
        handleDragEnter(e)
      })
      document.removeEventListener("drop", (e) => handleDropInvalid(e))
    }
  }, [])
}

export default useWindowDragDetect
