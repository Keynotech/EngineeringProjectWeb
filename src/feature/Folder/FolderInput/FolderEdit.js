/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import FolderInputLayout from "./FolderInput.layout"
import useUpdateFolder from "../../../hooks/mutation/useUpdateFolder"
import { hideFolderEdit } from "../../../store/features/foldersSlice"
import useSingleFolderQuery from "../../../hooks/query/useSingleFolderQuery"

function FolderEdit() {
  const { t } = useTranslation()
  const folderId = useSelector((state) => state.folders.editPageFolderId)
  const updateFolder = useUpdateFolder(folderId.payload)
  const folder = useSingleFolderQuery(folderId.payload)

  const dispatch = useDispatch()
  const _hideFolderEdit = () => {
    dispatch(hideFolderEdit())
  }

  const onSubmit = (values) => {
    const data = values.values
    updateFolder.mutate({ ...data })
    _hideFolderEdit()
  }

  return (
    <FolderInputLayout
      onSubmit={onSubmit}
      onCancel={_hideFolderEdit}
      folder={folder}
      dialogName={t("folders.edit")}
      submitText={t("save")}
    />
  )
}

export default FolderEdit
