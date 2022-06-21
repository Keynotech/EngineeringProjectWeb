/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import TaskList from "../../feature/Task/TaskList/TaskList"
import AppPageLayout from "../../layout/AppPageLayout/AppPageLayout"
import useTodayTasks from "../../hooks/query/useTodayTasks"

function Today() {
  const { t } = useTranslation()

  const tasksQuery = useTodayTasks()

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "dueDate" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]
  return (
    <AppPageLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Today"
        inputDueDateVal={new Date().toISOString()}
        groupOptions={groupOptions}
      />
    </AppPageLayout>
  )
}

export default Today
