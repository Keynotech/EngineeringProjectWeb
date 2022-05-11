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
    const handleDragEnter = () => {
      _onDragEnter()
    }
    const handleDragLeave = (e) => {
      if (!e.fromElement) {
        _onDragLeave()
      }
    }
    const handleDropInvalid = (e) => {
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
