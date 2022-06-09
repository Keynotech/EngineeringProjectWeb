/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useNavigate, useParams } from "react-router-dom"
import useGetTaskByProject from "../../../hooks/query/useGetTaskByProject"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"

function ProjectPage() {
  const { t } = useTranslation()
  const { projectId } = useParams()
  const project = useSingleProjectQuery(projectId)
  const navigate = useNavigate()

  useEffect(() => {
    if (project === undefined || null) {
      navigate("/inbox")
    }
  }, [project])

  const tasksQuery = useGetTaskByProject(projectId)

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "default" },
    { name: t("task.groupOptions.dueDate"), key: "dueDate" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]

  return (
    <MainLayout>
      {project ? (
        <TaskList
          tasks={tasksQuery}
          listName={project.projectName}
          listIcon={
            <InboxOutlinedIcon fontSize="inherit" groupOptions={groupOptions} />
          }
          inputProjectVal={projectId}
        />
      ) : null}
    </MainLayout>
  )
}

export default ProjectPage
