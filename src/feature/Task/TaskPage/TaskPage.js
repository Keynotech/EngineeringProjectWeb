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
import Dropdown from "../../../components/Dropdown/Dropdown"
import useSingleTaskQuery from "../../../hooks/query/useSingleTaskQuery"
import useDeleteTask from "../../../hooks/mutation/useDeleteTask"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import FileUpload from "../../../components/input/FileUpload.js/FileUpload"

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
  const updateTask = useUpdateTask(taskId)
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
                {task.data.files?.map((file, index) => (
                  <AttachmentItem key={index} isFile>
                    <AttachmentItemInner isFile>
                      <p>{file}</p>
                    </AttachmentItemInner>
                  </AttachmentItem>
                ))}
              </AttachmentsContainer>
            </SectionContainer>
          </SectionWrapper>

          <Footer>
            <FooterContainer>
              <div>Updated at {formatDateTimeToDisplay(task.data.updated)}</div>

              <Dropdown
                isOpen={menuIsOpen}
                toggleComponent={
                  <MoreHorizIcon
                    onClick={() => toggleMenu(!menuIsOpen)}
                    color="inherit"
                    sx={{
                      cursor: "pointer",
                    }}
                  />
                }
                menuComponent={
                  <MenuContainer>
                    <MenuItem type="button">
                      <FileCopyIcon color="inherit" fontSize="inehrit" />
                      Clone
                    </MenuItem>
                    <MenuItem type="button" onClick={deleteTaskFunc}>
                      <ForwardIcon color="inherit" fontSize="inehrit" />
                      Go to project
                    </MenuItem>
                    <MenuItem type="button" onClick={deleteTaskFunc}>
                      <DeleteOutlineOutlinedIcon
                        color="inherit"
                        fontSize="inehrit"
                      />
                      Delete Task
                    </MenuItem>
                  </MenuContainer>
                }
              />
            </FooterContainer>
          </Footer>
        </DetailsContainer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
