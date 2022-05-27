/* eslint-disable no-underscore-dangle */
import React from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useParams } from "react-router-dom"
import useGetTaskByTag from "../../../hooks/query/useGetTaskByTag"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"

function TagPage() {
  const { tagId } = useParams()
  const tag = useSingleTagQuery(tagId)
  const tasksQuery = useGetTaskByTag(tagId)

  return (
    <MainLayout>
      {tasksQuery.isSuccess ? (
        <TaskList
          tasks={tasksQuery.data}
          listName={tag.tagName}
          listIcon={<InboxOutlinedIcon fontSize="inherit" />}
        />
      ) : (
        <div />
      )}
    </MainLayout>
  )
}

export default TagPage
