/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React from "react"
import { useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useParams } from "react-router-dom"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import LastPageIcon from "@mui/icons-material/LastPage"
import { hideTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../../../components/button/Checkbox"
import TextInput from "../../../components/input/TextInput"
import PriorityPicker from "../../../components/picker/PriorityPicker/PriorityPicker"
import DatePicker from "../../../components/picker/DatePicker/DatePicker"
import TagPicker from "../../../components/picker/TagPicker/TagPicker"
import {
  useTaskQuery,
  useUpdateSingleTask,
  useDeleteTask,
} from "../../../api/api"
import { formatDateTimeToDisplay } from "../../../utils/dateConvert"
import {
  Wrapper,
  Container,
  MainContainer,
  IconContainer,
  TitleContainer,
  DetailsContainer,
  SectionHeader,
  PropertiesContainer,
  SectionContainer,
  Footer,
  TagsContainer,
  FooterContainer,
  AttachmentsContainer,
  Attachment,
} from "./TaskPage.style"
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"

function TaskPage() {
  // Queries
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
  const changeDesc = (value) => updateTask.mutate({ description: value }) // [TODO] mutates each time the user makes a change
  const changeTitle = (value) => updateTask.mutate({ title: value }) // [TODO] mutates each time the user makes a change
  const changePriority = (value) => updateTask.mutate({ priority: value })
  const changeDueDate = (value) => updateTask.mutate({ dueDate: value })
  const changeStatus = () => updateTask.mutate({ status: !task.data.status })
  const changeTags = (value) => updateTask.mutate({ tags: value }) // [TODO] mutates every time, even if the data hasnt changed

  // Others
  // ===========================================================================
  const theme = useTheme()

  return task.isSuccess ? (
    <Wrapper>
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
            <TagPicker onChange={changeTags} currentTags={task.data.tags} />

            <DatePicker
              onChange={changeDueDate}
              value={task.data.dueDate}
              dropdownTo="right"
            />

            <PriorityPicker
              onChange={changePriority}
              value={task.data.priority}
            />
          </PropertiesContainer>
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
              {task.data.attachments?.map((attachment, index) => (
                <Attachment key={index} isFile>
                  {attachment.name}
                </Attachment>
              ))}
              <Attachment isFile={false}>
                <FileUploadOutlinedIcon color="inherit" />

                <p>Upload file</p>
              </Attachment>
            </AttachmentsContainer>
          </SectionContainer>

          <SectionContainer>
            <TagsContainer>
              {task.data.tags?.map((tag) => (
                <TagDisplayInTask key={tag} tagId={tag} />
              ))}
            </TagsContainer>
          </SectionContainer>
        </DetailsContainer>
        <Footer>
          <FooterContainer>
            <div>Updated at {formatDateTimeToDisplay(task.data.createdAt)}</div>
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
