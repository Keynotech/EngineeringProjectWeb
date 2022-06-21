/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useDispatch } from "react-redux"
import ProjectInputLayout from "./ProjectInput.layout"
import useCreateProject from "../../../hooks/mutation/useCreateProject"
import { hideProjectInput } from "../../../store/features/layoutSlice"

function ProjectInput() {
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
      dialogName="Create project"
      submitText="Create"
    />
  )
}

export default ProjectInput
