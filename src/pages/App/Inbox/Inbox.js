/* eslint-disable no-underscore-dangle */
import React from "react"
import styled from "styled-components"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import Header from "../../../feature/Task/TaskList/TaskListHeader"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useTasksQuery from "../../../hooks/query/useTasksQuery"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

function Inbox() {
  const tasks = useTasksQuery()

  return (
    <MainLayout>
      <Header
        icon={<InboxOutlinedIcon fontSize="inherit" />}
        name="Inbox"
        additionaInfo={tasks.data ? `${tasks.data.length} tasks` : null}
      />
      <Wrapper>{tasks.isSuccess ? <TaskList tasks={tasks} /> : null}</Wrapper>
    </MainLayout>
  )
}

export default Inbox
