/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import TagInputLayout from "./TagInput.layout"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"
import useUpdateTag from "../../../hooks/mutation/useUpdateTag"
import { hideTagEdit } from "../../../store/features/tagEditPageSlice"

function TagEdit() {
  const tagId = useSelector((state) => state.tagEditPage.tagId)
  const updateTag = useUpdateTag(tagId.payload)
  const tag = useSingleTagQuery(tagId.payload)

  const dispatch = useDispatch()
  const _hideTagEdit = () => {
    dispatch(hideTagEdit())
  }

  const onSubmit = (values) => {
    const data = values.values
    updateTag.mutate({ ...data })
    _hideTagEdit()
  }

  const { t } = useTranslation()

  return (
    <TagInputLayout
      onSubmit={onSubmit}
      onCancel={_hideTagEdit}
      tag={tag}
      dialogName={t("tags.edit")}
      submitText={t("save")}
    />
  )
}

export default TagEdit
