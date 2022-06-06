/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useNavigate, useParams } from "react-router-dom"
import useGetTaskByProject from "../../../hooks/query/useGetTaskByProject"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"

function ProjectPage() {
  const { projectId } = useParams()
  const project = useSingleProjectQuery(projectId)
  const navigate = useNavigate()

  useEffect(() => {
    if (project === undefined || null) {
      navigate("/inbox")
    }
  }, [project])

  const tasksQuery = useGetTaskByProject(projectId)

  return (
    <MainLayout>
      {project ? (
        <TaskList
          tasks={tasksQuery}
          listName={project.projectName}
          listIcon={<InboxOutlinedIcon fontSize="inherit" />}
          inputProjectVal={projectId}
        />
      ) : null}
    </MainLayout>
  )
}

export default ProjectPage
