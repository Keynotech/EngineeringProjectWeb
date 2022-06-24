/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import useTasksQuery from "../../../hooks/query/useTasksQuery"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"

function Inbox() {
  const { t } = useTranslation()

  const tasksQuery = useTasksQuery((tasks) =>
    tasks.filter((task) => task.project === null || undefined)
  )

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "default" },
    { name: t("task.groupOptions.dueDate"), key: "dueDate" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]

  return (
    <MainLayout>
      <TaskList
        tasks={tasksQuery}
        listName={t("sidebar.inbox")}
        groupOptions={groupOptions}
      />
    </MainLayout>
  )
}

export default Inbox
