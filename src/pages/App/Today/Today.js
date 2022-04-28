/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import Header from "../../../components/lists/Tasks/TaskListHeader"
import TasksList from "../../../components/lists/Tasks/TasksList"
import MainLayout from "../../../components/layout/MainLayout"
import { useTasksQuery } from "../../../app/api/api"

function Today() {
  const tasks = useTasksQuery()

  return (
    <MainLayout>
      <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Today" />
      <div style={{ marginTop: "20px" }}>
        {tasks.isSuccess ? <TasksList tasks={tasks} /> : null}
      </div>
    </MainLayout>
  )
}

export default Today
