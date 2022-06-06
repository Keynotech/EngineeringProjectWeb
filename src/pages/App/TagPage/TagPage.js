/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useParams, useNavigate } from "react-router-dom"
import useGetTaskByTag from "../../../hooks/query/useGetTaskByTag"
import TaskList from "../../../feature/Task/TaskList/TaskList"
import MainLayout from "../../../layout/MainLayout/MainLayout"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"

function TagPage() {
  const { tagId } = useParams()
  const tag = useSingleTagQuery(tagId)
  const tasksQuery = useGetTaskByTag(tagId)

  const navigate = useNavigate()

  useEffect(() => {
    if (tag === undefined || null) {
      navigate("/inbox")
    }
  }, [tag])

  return (
    <MainLayout>
      {tag ? (
        <TaskList
          tasks={tasksQuery}
          listName={tag.tagName}
          listIcon={<InboxOutlinedIcon fontSize="inherit" />}
          inputTagVal={[tagId]}
        />
      ) : null}
    </MainLayout>
  )
}

export default TagPage
