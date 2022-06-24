/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React from "react"
import { useTranslation } from "react-i18next"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useTodayTasks from "../../../hooks/query/useTodayTasks"

function Today() {
  const { t } = useTranslation()

  const tasksQuery = useTodayTasks()

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "dueDate" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]
  return (
    <MainLayout>
      <TaskList
        tasks={tasksQuery}
        listName={t("sidebar.today")}
        inputDueDateVal={new Date().toISOString()}
        groupOptions={groupOptions}
      />
    </MainLayout>
  )
}

export default Today
