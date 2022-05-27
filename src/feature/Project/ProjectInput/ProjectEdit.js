/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import ProjectInputLayout from "./ProjectInput.layout"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"
import useUpdateProject from "../../../hooks/mutation/useUpdateProject"
import { hideProjectEdit } from "../../../store/features/projectEditPageSlice"

function ProjectEdit() {
  const projectId = useSelector((state) => state.projectEditPage.projectId)
  const updateProject = useUpdateProject(projectId.payload)
  const project = useSingleProjectQuery(projectId.payload)

  const dispatch = useDispatch()
  const _hideProjectEdit = () => {
    dispatch(hideProjectEdit())
  }

  const onSubmit = (values) => {
    const data = values.values
    updateProject.mutate({ ...data })
    _hideProjectEdit()
  }

  return (
    <ProjectInputLayout
      onSubmit={onSubmit}
      onCancel={_hideProjectEdit}
      project={project}
      dialogName="Edit project"
      submitText="Save"
    />
  )
}

export default ProjectEdit
