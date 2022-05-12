/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import ForwardIcon from "@mui/icons-material/Forward"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useTheme } from "styled-components"
import { hideTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../../../components/button/Checkbox"
import TextInput from "../../../components/input/TextInput"
import PriorityPicker from "../../../components/picker/PriorityPicker/PriorityPicker"
import DatePicker from "../../../components/picker/DatePicker/DatePicker"
import TagPicker from "../../../components/picker/TagPicker/TagPicker"
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
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"
import useSingleTaskQuery from "../../../hooks/query/useSingleTaskQuery"
import useDeleteTask from "../../../hooks/mutation/useDeleteTask"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import FileUpload from "../../../components/input/FileUpload.js/FileUpload"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu"

function TaskPage() {
  // Queries
  // ===========================================================================
  let { taskId } = useParams()
  const task = useSingleTaskQuery(taskId)

  // Local State
  // ===========================================================================

  const [menuIsOpen, toggleMenu] = useState(false)

  // Selectors
  // ===========================================================================
  const isOpen = useSelector((state) => state.layout.taskPageVisibility)

  // Hooks
  // ===========================================================================

  useEffect(() => {
    toggleMenu(false)
  }, [taskId])

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  // Mutations
  // ===========================================================================
  const updateTaskMutation = useUpdateTask(taskId)
  const deleteTaskMutation = useDeleteTask(taskId)
  const deleteTask = () => deleteTaskMutation.mutate()
  const changeDesc = (value) =>
    updateTaskMutation.mutate({ description: value }) // [TODO] mutates each time the user makes a change
  const changeTitle = (value) => updateTaskMutation.mutate({ title: value }) // [TODO] mutates each time the user makes a change
  const changePriority = (value) =>
    updateTaskMutation.mutate({ priority: value })
  const changeDueDate = (value) => updateTaskMutation.mutate({ dueDate: value })
  const changeStatus = () =>
    updateTaskMutation.mutate({ status: !task.data.status })
  const changeTags = (value) => updateTaskMutation.mutate({ tags: value }) // [TODO] mutates every time, even if the data hasnt changed

  // Others
  // ===========================================================================
  const theme = useTheme()

  const menuItems = [
    {
      icon: <FileCopyIcon color="inherit" fontSize="inehrit" />,
      title: "Clone",
    },
    {
      icon: <ForwardIcon color="inherit" fontSize="inehrit" />,
      title: "Go to project",
    },
    {
      icon: <DeleteOutlineOutlinedIcon color="inherit" fontSize="inehrit" />,
      title: "Delete Task",
      onClick: deleteTask,
    },
  ]

  // ref
  // ===========================================================================
  const fileUploadRef = useRef()
  const openUpload = () => fileUploadRef.current.openUpload()

  return task.isSuccess ? (
    <Wrapper>
      <Container>
        {isOpen ? <FileUpload ref={fileUploadRef} taskId={taskId} /> : null}
        <MainContainer>
          <IconContainer>
            <Checkbox
              id="task-status"
              checked={task.data.status}
              priority={task.data.priority}
              onChange={changeStatus}
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
              onClick={_hideTaskPage}
              color="inherit"
              sx={{ cursor: "pointer" }}
            />
          </IconContainer>
        </MainContainer>
        <DetailsContainer>
          <PropertiesContainer>
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
              <TagsContainer>
                {task.data.tags.map((tag) => (
                  <TagDisplayInTask key={tag} tagId={tag} />
                ))}
              </TagsContainer>
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
                  <AttachmentItem key={file._id} isFile>
                    <AttachmentItemInner isFile>
                      <p>{file?.file[0].originalname}</p>
                    </AttachmentItemInner>
                  </AttachmentItem>
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
                toggleComponent={
                  <MoreHorizIcon
                    color="inherit"
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => toggleMenu(!menuIsOpen)}
                  />
                }
                menuItems={menuItems}
              />
            </FooterContainer>
          </Footer>
        </DetailsContainer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
