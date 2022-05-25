/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"

function Inbox() {
  return (
    <MainLayout>
      <TaskList
        listName="Inbox"
        listIcon={<InboxOutlinedIcon fontSize="inherit" />}
      />
    </MainLayout>
  )
}

export default Inbox
