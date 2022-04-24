/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import Header from "../../../components/lists/Tasks/TaskListHeader"
import TasksList from "../../../components/lists/Tasks/TasksList"
import MainLayout from "../../../components/layout/MainLayout"
import { useTasksQuery } from "../../../app/api/api"

function Inbox() {
  const tasks = useTasksQuery()

  return (
    <MainLayout>
      <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Inbox" />
      <div style={{ marginTop: "20px" }}>
        {tasks.isSuccess ? <TasksList tasks={tasks.data} /> : null}
      </div>
    </MainLayout>
  )
}

export default Inbox
