/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import useTasksQuery from "../../../hooks/query/useTasksQuery"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"

function Upcoming() {
  const { t } = useTranslation()

  const tasksQuery = useTasksQuery((tasks) =>
    tasks.filter((task) => task.dueDate !== null || undefined)
  )

  const groupOptions = [
    { name: t("task.groupOptions.dueDate"), key: "dueDate" },
  ]
  return (
    <MainLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Upcoming"
        groupOptions={groupOptions}
      />
    </MainLayout>
  )
}

export default Upcoming
