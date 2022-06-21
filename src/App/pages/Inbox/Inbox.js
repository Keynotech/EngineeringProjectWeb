/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import useTasksQuery from "../../hooks/query/useTasksQuery"
import TaskList from "../../feature/Task/TaskList/TaskList"
import AppPageLayout from "../../layout/AppPageLayout/AppPageLayout"

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
    <AppPageLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Inbox"
        groupOptions={groupOptions}
      />
    </AppPageLayout>
  )
}

export default Inbox
