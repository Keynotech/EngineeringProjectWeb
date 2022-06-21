/* eslint-disable no-underscore-dangle */
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useParams, useNavigate } from "react-router-dom"
import useGetTaskByTag from "../../hooks/query/useGetTaskByTag"
import TaskList from "../../feature/Task/TaskList/TaskList"
import AppPageLayout from "../../layout/AppPageLayout/AppPageLayout"
import useSingleTagQuery from "../../hooks/query/useSingleTagQuery"

function TagPage() {
  const { t } = useTranslation()
  const { tagId } = useParams()
  const tag = useSingleTagQuery(tagId)
  const tasksQuery = useGetTaskByTag(tagId)

  const navigate = useNavigate()

  useEffect(() => {
    if (tag === undefined || null) {
      navigate("/inbox")
    }
  }, [tag])

  const groupOptions = [
    { name: t("task.groupOptions.default"), key: "default" },
    { name: t("task.groupOptions.dueDate"), key: "dueDate" },
    { name: t("task.groupOptions.createdDate"), key: "createdAt" },
    { name: t("task.groupOptions.priority"), key: "priority" },
  ]

  return (
    <AppPageLayout>
      {tag ? (
        <TaskList
          tasks={tasksQuery}
          groupOptions={groupOptions}
          listName={tag.tagName}
          listIcon={
            <InboxOutlinedIcon fontSize="inherit" groupOptions={groupOptions} />
          }
          inputTagVal={[tagId]}
        />
      ) : null}
    </AppPageLayout>
  )
}

export default TagPage
