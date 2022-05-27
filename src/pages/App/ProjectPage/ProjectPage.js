/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useParams } from "react-router-dom"
import useGetTaskByProject from "../../../hooks/query/useGetTaskByProject"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"

function ProjectPage() {
  const { projectId } = useParams()
  const project = useSingleProjectQuery(projectId)
  const tasksQuery = useGetTaskByProject(projectId)

  return (
    <MainLayout>
      {tasksQuery.isSuccess ? (
        <TaskList
          tasks={tasksQuery.data}
          listName={project.projectName}
          listIcon={<InboxOutlinedIcon fontSize="inherit" />}
        />
      ) : (
        <div />
      )}
    </MainLayout>
  )
}

export default ProjectPage
