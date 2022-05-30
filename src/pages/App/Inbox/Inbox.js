/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import useTasksQuery from "../../../hooks/query/useTasksQuery"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"

function Inbox() {
  const tasksQuery = useTasksQuery()

  return (
    <MainLayout>
      <TaskList
        tasks={tasksQuery}
        listName="Inbox"
        listIcon={<InboxOutlinedIcon fontSize="inherit" />}
      />
    </MainLayout>
  )
}

export default Inbox
