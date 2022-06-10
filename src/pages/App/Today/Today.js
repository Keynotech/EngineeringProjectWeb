/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import isToday from "date-fns/isToday"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useTasksQuery from "../../../hooks/query/useTasksQuery"

function Today() {
  const { t } = useTranslation()

  const tasksQuery = useTasksQuery((tasks) =>
    tasks.filter((task) => isToday(new Date(task.dueDate)))
  )

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "default" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]
  return (
    <MainLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Today"
        inputDueDateVal={new Date().toISOString()}
        groupOptions={groupOptions}
      />
    </MainLayout>
  )
}

export default Today
