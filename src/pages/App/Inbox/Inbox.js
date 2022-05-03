/* eslint-disable no-underscore-dangle */
import React from "react"
import styled from "styled-components"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import Header from "../../../feature/Task/TaskList/TaskListHeader"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import { useTasksQuery } from "../../../api/api"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

function Inbox() {
  const tasks = useTasksQuery()

  return (
    <MainLayout>
      <Wrapper>
        <Header icon={<InboxOutlinedIcon fontSize="inherit" />} name="Inbox" />
        <div style={{ marginTop: "20px" }}>
          {tasks.isSuccess ? <TaskList tasks={tasks} /> : null}
        </div>
      </Wrapper>
    </MainLayout>
  )
}

export default Inbox
