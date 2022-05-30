/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab"
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined"
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useTheme } from "styled-components"
import { hideTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../TaskCheckbox/TaskCheckbox"
import TextInput from "../../../components/TextInput/TextInput"
import PriorityPicker from "../../Pickers/PriorityPicker/PriorityPicker"
import DatePicker from "../../Pickers/DatePicker/DatePicker"
import TagPicker from "../../Pickers/TagPicker/TagPicker"
import ProjectPicker from "../../Pickers/ProjectPicker/ProjectPicker"
import { formatDateTimeToDisplay } from "../../../utils/dateConvert"
import {
  Wrapper,
  Container,
  MainContainer,
  IconContainer,
  TitleContainer,
  DetailsContainer,
  SectionWrapper,
  SectionHeader,
  PropertiesContainer,
  SectionContainer,
  Footer,
  TagsContainer,
  FooterContainer,
  AttachmentsContainer,
  AttachmentItem,
  AttachmentItemInner,
  MenuContainer,
  MenuItem,
} from "./TaskPage.style"
import useSingleTaskQuery from "../../../hooks/query/useSingleTaskQuery"
import useDeleteTask from "../../../hooks/mutation/useDeleteTask"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import useDeleteFile from "../../../hooks/mutation/useDeleteFile"
import FileUpload from "../../FileUpload/FileUpload"
import {
  DropdownMenu,
  DropdownItemMenu,
} from "../../../components/DropdownMenu"
import useGetTaskTags from "../../../hooks/query/useGetTaskTags"
import Chip from "../../../components/Chip/Chip"

function TaskPage() {
  // Others
  // ===========================================================================
  const theme = useTheme()
  const navigate = useNavigate()
  const goBack = () => navigate("../")

  // Queries
  // ===========================================================================
  let { taskId } = useParams()
  const task = useSingleTaskQuery(taskId)
  const taskTags = useGetTaskTags(task && task.isSuccess ? task.data.tags : [])

  // Local State
  // ===========================================================================

  const [menuIsOpen, toggleMenu] = useState(false)

  // Selectors
  // ===========================================================================
  const isOpen = useSelector((state) => state.layout.taskPageVisibility)

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  // Mutations
  // ===========================================================================
  const updateTaskMutation = useUpdateTask(taskId)
  const deleteTaskMutation = useDeleteTask(taskId)
  const deleteTaskFileMutation = useDeleteFile(taskId)

  const deleteFile = (fileId) => deleteTaskFileMutation.mutate(fileId)
  const deleteTask = () => {
    deleteTaskMutation.mutate()
    goBack()
  }
  const changeDesc = (value) =>
    updateTaskMutation.mutate({ description: value }) // [TODO] mutates each time the user makes a change
  const changeTitle = (value) => updateTaskMutation.mutate({ title: value }) // [TODO] mutates each time the user makes a change
  const changePriority = (value) =>
    updateTaskMutation.mutate({ priority: value })
  const changeDueDate = (value) => updateTaskMutation.mutate({ dueDate: value })
  const changeStatus = () =>
    updateTaskMutation.mutate({ status: !task.data.status })
  const changeTags = (value) => updateTaskMutation.mutate({ tags: value }) // [TODO] mutates every time, even if the data hasnt changed
  const changeProject = (value) => updateTaskMutation.mutate({ project: value })
  const removeTag = (tagId) => {
    const index = task.data.tags.findIndex((tag) => tag._id === tagId)
    const newData = [
      ...task.data.tags.slice(0, index),
      ...task.data.tags.slice(index + 1),
    ]
    updateTaskMutation.mutate({ tags: newData })
  }
  // ref
  // ===========================================================================
  const fileUploadRef = useRef()
  const openUpload = () => fileUploadRef.current.openUpload()

  // Hooks
  // ===========================================================================

  useEffect(() => {
    toggleMenu(false)
  }, [taskId])

  useEffect(() => {
    if (task.isError) {
      _hideTaskPage()
      goBack()
    }
  }, [task.isError])

  let tags = null
  if (taskTags) {
    tags = taskTags.map((tag) => (
      <Chip
        onClick={() => navigate(`/tag/${tag._id}/tasks/${taskId}`)}
        label={tag.tagName}
        key={tag._id}
        variant="outlined"
        size="small"
        clickable
        onDelete={() => removeTag(tag._id)}
      />
    ))
  }

  return task && task.isSuccess ? (
    <Wrapper>
      <Container>
        {isOpen ? <FileUpload ref={fileUploadRef} taskId={taskId} /> : null}
        <MainContainer>
          <IconContainer>
            <Checkbox
              checked={task.data.status}
              onChange={changeStatus}
              priority={task.data.priority}
            />
          </IconContainer>
          <TitleContainer>
            <TextInput
              id="task-title"
              name="task-title"
              value={task.data.title}
              onChange={changeTitle}
              placeholder="Task title"
              multiline
              maxRows={2}
              fontSize="18px"
              fontWeight={600}
            />
          </TitleContainer>
          <IconContainer>
            <KeyboardTabIcon
              onClick={() => {
                goBack()
                _hideTaskPage()
              }}
              color="inherit"
              sx={{ cursor: "pointer" }}
            />
          </IconContainer>
        </MainContainer>
        <DetailsContainer>
          <PropertiesContainer>
            <ProjectPicker
              useCapture
              onChange={changeProject}
              value={task.data.project}
              border={`1px solid ${theme.tertiary} `}
            />
            <PriorityPicker
              useCapture
              onChange={changePriority}
              value={task.data.priority}
              border={`1px solid ${theme.tertiary} `}
            />

            <DatePicker
              onChange={changeDueDate}
              value={task.data.dueDate}
              useCapture
              border={`1px solid ${theme.tertiary} `}
            />

            <TagPicker
              useCapture
              onChange={changeTags}
              currentTags={task.data.tags}
              border={`1px solid ${theme.tertiary} `}
            />
          </PropertiesContainer>

          <SectionWrapper>
            <SectionContainer>
              <TextInput
                id="task-description"
                name="task-description"
                value={task.data.description}
                onChange={changeDesc}
                placeholder="Description"
                multiline
                maxRows={15}
                fontSize="14px"
              />
            </SectionContainer>

            <SectionContainer>
              <TagsContainer>{tags}</TagsContainer>
            </SectionContainer>

            <SectionContainer>
              <SectionHeader>Attachments</SectionHeader>
              <AttachmentsContainer>
                <AttachmentItem onClick={openUpload} isFile={false}>
                  <AttachmentItemInner isFile={false}>
                    <FileUploadOutlinedIcon color="inherit" />
                    <p>Upload file</p>
                  </AttachmentItemInner>
                </AttachmentItem>
                {task.data.files?.map((file) => (
                  <div key={file._id}>
                    <AttachmentItem isFile>
                      <AttachmentItemInner isFile>
                        <p>{file._id}</p>
                      </AttachmentItemInner>
                    </AttachmentItem>
                    <button onClick={() => deleteFile(file._id)} type="button">
                      Delete file
                    </button>
                  </div>
                ))}
              </AttachmentsContainer>
            </SectionContainer>
          </SectionWrapper>

          <Footer>
            <FooterContainer>
              <div>Updated at {formatDateTimeToDisplay(task.data.updated)}</div>

              <DropdownMenu
                isOpen={menuIsOpen}
                outsideClick={() => toggleMenu(false)}
                toggle={
                  <MoreHorizIcon
                    color="inherit"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => toggleMenu(!menuIsOpen)}
                  />
                }
              >
                <DropdownItemMenu
                  leftIcon={
                    <ContentCopyOutlinedIcon
                      color="inherit"
                      fontSize="inehrit"
                    />
                  }
                  label="Duplicate tag"
                />
                <DropdownItemMenu
                  leftIcon={
                    <ForwardOutlinedIcon color="inherit" fontSize="inehrit" />
                  }
                  label="Go to project"
                />
                <DropdownItemMenu
                  leftIcon={
                    <DeleteOutlineOutlinedIcon
                      color="inherit"
                      fontSize="inehrit"
                    />
                  }
                  label="Delete task"
                  onClick={deleteTask}
                />
              </DropdownMenu>
            </FooterContainer>
          </Footer>
        </DetailsContainer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
