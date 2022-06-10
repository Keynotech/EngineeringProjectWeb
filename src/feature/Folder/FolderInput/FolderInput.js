/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import FolderInputLayout from "./FolderInput.layout"
import useCreateFolder from "../../../hooks/mutation/useCreateFolder"
import { hideFolderInput } from "../../../store/features/layoutSlice"

function FolderInput() {
  const { t } = useTranslation()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideFolderInput = () => {
    dispatch(hideFolderInput())
  }

  // Mutations
  // ===========================================================================
  const createFolder = useCreateFolder()
  const onSubmit = (values) => {
    const data = values.values
    createFolder.mutate({ ...data })
    _hideFolderInput()
  }

  return (
    <FolderInputLayout
      onCancel={_hideFolderInput}
      onSubmit={onSubmit}
      dialogName={t("folders.create")}
      submitText={t("create")}
    />
  )
}

export default FolderInput
