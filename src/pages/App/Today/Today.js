/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import Header from "../../../feature/Task/TaskList/TaskListHeader"
import MainLayout from "../../../layout/MainLayout/MainLayout"

function Today() {
  return (
    <MainLayout>
      <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Today" />
    </MainLayout>
  )
}

export default Today
