/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useParams } from "react-router-dom"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import LastPageIcon from "@mui/icons-material/LastPage"
import { hideTaskPage } from "../../../../app/store/features/layoutSlice"
import Checkbox from "../../../button/Checkbox"
import TextInput from "../../../input/TextInput"
import PriorityPicker from "../../../picker/PriorityPicker/PriorityPicker"
import DatePicker from "../../../picker/DatePicker/DatePicker"
import TagPicker from "../../../picker/TagPicker/TagPicker"
import TagItem from "../../TagItem/TagItem"
import {
  useTaskQuery,
  useUpdateSingleTask,
  useDeleteTask,
} from "../../../../app/api/api"
import { formatDateTimeToDisplay } from "../../../../utils/dateConvert"
import {
  Wrapper,
  Container,
  MainContainer,
  IconContainer,
  TitleContainer,
  DetailsContainer,
  SectionHeader,
  PropertiesContainer,
  Propertie,
  PropertieValue,
  SectionContainer,
  Footer,
  FooterContainer,
  AttachmentsContainer,
  Attachment,
} from "./TaskPage.style"

function TaskPage() {
  // Query
  // ===========================================================================
  let { taskId } = useParams()
  const task = useTaskQuery(taskId)

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  // Mutations
  // ===========================================================================
  const updateTask = useUpdateSingleTask(taskId)
  const deleteTask = useDeleteTask(taskId)
  const deleteTaskFunc = () => deleteTask.mutate()
  const changeDesc = (value) => updateTask.mutate({ description: value })
  const changeTitle = (value) => updateTask.mutate({ title: value })
  const changePriority = (value) => updateTask.mutate({ priority: value })
  const changeDueDate = (value) => updateTask.mutate({ dueDate: value })
  const changeStatus = () => updateTask.mutate({ status: !task.data.status })
  const changeTags = (value) => console.log(value)

  // Selectors &   Locale state
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.taskPageVisibility)

  const theme = useTheme()

  return task.isSuccess ? (
    <Wrapper isVisible={isVisible}>
      <Container>
        <MainContainer>
          <IconContainer>
            <Checkbox
              checked={task.data.status}
              priority={task.data.priority}
              onChange={changeStatus}
            />
          </IconContainer>
          <TitleContainer>
            <TextInput
              value={task.data.title}
              onChange={changeTitle}
              placeholder="Task title"
              multiline
              maxRows={2}
              fontSize="16px"
            />
          </TitleContainer>
          <IconContainer>
            <LastPageIcon
              onClick={_hideTaskPage}
              sx={{ color: theme.textSecondary }}
            />
          </IconContainer>
        </MainContainer>
        <DetailsContainer>
          <PropertiesContainer>
            <DatePicker
              onChange={changeDueDate}
              value={task.data.dueDate}
              dropdownTo="right"
            />

            <PriorityPicker
              onChange={changePriority}
              value={task.data.priority}
            />

            <TagPicker onChange={changeTags} value={task.data.tags} />
          </PropertiesContainer>
          {task.data.tags.map((tag) => (
            <TagItem key={tag._id} tag={tag} />
          ))}
          <SectionContainer>
            <SectionHeader>Description</SectionHeader>
            <TextInput
              value={task.data.description}
              onChange={changeDesc}
              placeholder="Description"
              multiline
              maxRows={15}
              fontSize="12px"
            />
          </SectionContainer>

          <SectionContainer>
            <SectionHeader>Attachments</SectionHeader>
            <AttachmentsContainer>
              {task.data.attachments
                ? task.data.attachments.map((attachment) => (
                    <Attachment isFile>{attachment.name}</Attachment>
                  ))
                : null}
              <Attachment isFile={false}>
                <FileUploadOutlinedIcon color="inherit" />

                <p>Upload file</p>
              </Attachment>
            </AttachmentsContainer>
          </SectionContainer>
        </DetailsContainer>
        <Footer>
          <FooterContainer>
            <div>Updated at {formatDateTimeToDisplay(task.data.updated)}</div>
            <DeleteOutlineOutlinedIcon
              onClick={deleteTaskFunc}
              color="inherit"
            />
          </FooterContainer>
        </Footer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
