/* eslint-disable no-underscore-dangle */
import React from "react"
import { useQuery } from "react-query"
import InboxIcon from "@mui/icons-material/Inbox"
import Header from "../../../components/lists/Tasks/TaskListHeader"
import TasksList from "../../../components/lists/Tasks/TasksList"
import MainLayout from "../../../components/layout/MainLayout"

function Inbox() {
  const tasks = useQuery(["tasks", "inbox"], () =>
    fetch("http://localhost:5000/tasks").then((res) => res.json())
  )

  return (
    <MainLayout>
      <Header icon={<InboxIcon fontSize="inherit" />} name="Inbox" />
      {tasks.isSuccess ? <TasksList tasks={tasks.data} /> : null}
    </MainLayout>
  )
}

export default Inbox
