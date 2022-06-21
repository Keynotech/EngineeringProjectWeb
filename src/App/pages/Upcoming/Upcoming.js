/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import useTasksQuery from "../../hooks/query/useTasksQuery"
import TaskList from "../../feature/Task/TaskList/TaskList"
import AppPageLayout from "../../layout/AppPageLayout/AppPageLayout"

function Upcoming() {
  const { t } = useTranslation()

  const tasksQuery = useTasksQuery((tasks) =>
    tasks.filter((task) => task.dueDate !== null || undefined)
  )

  const groupOptions = [
    { name: t("task.groupOptions.dueDate"), key: "dueDate" },
  ]
  return (
    <AppPageLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Upcoming"
        groupOptions={groupOptions}
      />
    </AppPageLayout>
  )
}

export default Upcoming
