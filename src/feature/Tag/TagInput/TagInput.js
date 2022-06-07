/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import TagInputLayout from "./TagInput.layout"
import useCreateTag from "../../../hooks/mutation/useCreateTag"
import { hideTagInput } from "../../../store/features/layoutSlice"

function TagInput() {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTagInput = () => {
    dispatch(hideTagInput())
  }

  // Mutations
  // ===========================================================================
  const createTag = useCreateTag()
  const onSubmit = (values) => {
    const data = values.values
    createTag.mutate({ ...data })
    _hideTagInput()
  }

  const { t } = useTranslation()

  return (
    <TagInputLayout
      onCancel={_hideTagInput}
      onSubmit={onSubmit}
      dialogName={t("tags.create")}
      submitText={t("create")}
    />
  )
}

export default TagInput
