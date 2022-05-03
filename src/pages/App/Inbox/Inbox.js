/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import Header from "../../../feature/Task/TaskList/TaskListHeader"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import { useTasksQuery } from "../../../api/api"

function Inbox() {
  const tasks = useTasksQuery()

  return (
    <MainLayout>
      <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Inbox" />
      <div style={{ marginTop: "20px" }}>
        {tasks.isSuccess ? <TaskList tasks={tasks} /> : null}
      </div>
    </MainLayout>
  )
}

export default Inbox
