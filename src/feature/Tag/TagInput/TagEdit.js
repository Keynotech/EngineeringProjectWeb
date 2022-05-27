/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React from "react"
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

  return (
    <TagInputLayout
      onSubmit={onSubmit}
      onCancel={_hideTagEdit}
      tag={tag}
      dialogName="Edit tag"
      submitText="Save"
    />
  )
}

export default TagEdit
