/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useNavigate } from "react-router-dom"
import Header from "../../../feature/Task/TaskList/TaskListHeader"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import Chip from "../../../components/Chip/Chip"

function Today() {
  const navigate = useNavigate()
  return (
    <MainLayout>
      <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Today" />
      <Chip
        onClick={() => navigate("/inbox")}
        label="tag"
        variant="outlined"
        size="small"
        clickable
        onDelete={() => console.log("delete")}
      />
    </MainLayout>
  )
}

export default Today
