/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import ProjectInputLayout from "./ProjectInput.layout"
import useCreateProject from "../../../hooks/mutation/useCreateProject"
import { hideProjectInput } from "../../../store/features/layoutSlice"

function ProjectInput() {
  const { t } = useTranslation()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideProjectInput = () => {
    dispatch(hideProjectInput())
  }

  // Mutations
  // ===========================================================================
  const createProject = useCreateProject()
  const onSubmit = (values) => {
    const data = values.values
    createProject.mutate({ ...data })
    _hideProjectInput()
  }

  return (
    <ProjectInputLayout
      onCancel={_hideProjectInput}
      onSubmit={onSubmit}
      dialogName={t("project.create")}
      submitText={t("create")}
    />
  )
}

export default ProjectInput
