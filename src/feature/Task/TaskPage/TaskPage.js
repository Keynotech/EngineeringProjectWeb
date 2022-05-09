/* eslint-disable eqeqeq */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import KeyboardTabIcon from "@mui/icons-material/KeyboardTab"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import ForwardIcon from "@mui/icons-material/Forward"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
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
  SectionWrapper,
  SectionHeader,
  PropertiesContainer,
  SectionContainer,
  Footer,
  TagsContainer,
  FooterContainer,
  AttachmentsContainer,
  Attachment,
  MenuContainer,
  MenuItem,
} from "./TaskPage.style"
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"
import Dropdown from "../../../components/Dropdown/Dropdown"

function TaskPage() {
  // Queries
  // ===========================================================================
  let { taskId } = useParams()
  const task = useTaskQuery(taskId)

  // Local State
  // ===========================================================================

  const [menuIsOpen, toggleMenu] = useState(false)

  // Hooks
  // ===========================================================================

  useEffect(() => {
    toggleMenu(false)
  }, [taskId])

  // Others
  // ===========================================================================
  const theme = useTheme()
  const navigation = useNavigate()

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
              fontSize="20px"
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
              onChange={changePriority}
              value={task.data.priority}
            />

            <DatePicker
              onChange={changeDueDate}
              value={task.data.dueDate}
              dropdownTo="right"
            />

            <TagPicker onChange={changeTags} currentTags={task.data.tags} />
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
          </SectionWrapper>

          <Footer>
            <FooterContainer>
              <div>
                Created at {formatDateTimeToDisplay(task.data.createdAt)}
              </div>

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
