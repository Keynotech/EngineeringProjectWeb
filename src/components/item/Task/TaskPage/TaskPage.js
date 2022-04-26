/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useTheme } from "styled-components"
import { useParams } from "react-router-dom"
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import LastPageIcon from "@mui/icons-material/LastPage"
import { hideTaskPage } from "../../../../app/store/features/layoutSlice"
import Checkbox from "../../../button/Checkbox"
import TextInput from "../../../input/TextInput"
import { useTaskQuery, useUpdateSingleTask } from "../../../../app/api/api"
import { formatDateToDisplay } from "../../../../utils/dateConvert"
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
  AttachmentsContainer,
} from "./TaskPage.style"

function TaskPage() {
  // ===========================================================================
  // Query
  // ===========================================================================
  let { taskId } = useParams()
  const task = useTaskQuery(taskId)

  // ===========================================================================
  // Mutations
  // ===========================================================================
  const updateTask = useUpdateSingleTask(taskId)
  const changeDesc = (value) => updateTask.mutate({ description: value })
  const changeTitle = (value) => updateTask.mutate({ title: value })

  // ===========================================================================
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  // ===========================================================================
  // Selectors &   Locale state
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.taskPageVisibility)

  // ===========================================================================
  // Others
  // ===========================================================================
  const theme = useTheme()

  return task.isSuccess ? (
    <Wrapper isVisible={isVisible}>
      <Container>
        <MainContainer>
          <IconContainer>
            <Checkbox
              checked={task.data.status}
              priority={task.data.priority}
              onChange={() => {
                updateTask.mutate({
                  status: !task.data.status,
                })
              }}
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
            <Propertie>
              <FlagOutlinedIcon fontSize="inherit" color="inherit" />
              <PropertieValue>Priority {task.data.priority}</PropertieValue>
            </Propertie>

            <Propertie>
              <CalendarMonthOutlinedIcon fontSize="inherit" color="inherit" />
              <PropertieValue>Due date</PropertieValue>
            </Propertie>

            <Propertie>
              <LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />
              <PropertieValue>Add tag</PropertieValue>
            </Propertie>
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
          </SectionContainer>
        </DetailsContainer>
        <Footer>Updated at {formatDateToDisplay(task.data.updated)}</Footer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
