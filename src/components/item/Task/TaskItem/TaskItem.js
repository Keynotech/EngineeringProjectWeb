/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { isPast, isToday } from "date-fns"
import PropTypes from "prop-types"
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined"
import { Link } from "react-router-dom"
import { showTaskPage } from "../../../../app/store/features/layoutSlice"
import Checkbox from "../../../button/Checkbox"
import { useUpdateTaskOnList } from "../../../../app/api/api"
import {
  Wrapper,
  Content,
  CheckboxContainer,
  MainContainer,
  Title,
  DatePropertie,
  PropertiesIcons,
  DetailsContainer,
  Description,
  DescriptionInner,
} from "./TaskItem.style"
import {
  convertDateToJS,
  formatDateToDisplay,
} from "../../../../utils/dateConvert"

function TaskItem({ task }) {
  // ===========================================================================
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())

  // ===========================================================================
  // Selectors &   Locale state
  // ===========================================================================

  const displayTasksDetails = useSelector((state) => state.tasks.displayDetails)
  const [isOverdue, setIsOverdue] = useState(false)
  const [isAttachment, setIsAttachment] = useState(false)

  // ===========================================================================
  // Mutations
  // ===========================================================================
  const updateTask = useUpdateTaskOnList(task._id)
  const _toggleIsDone = () => updateTask.mutate({ status: !task.status })

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    if (task.dueDate) {
      const _date = convertDateToJS(task.dueDate)
      if (isPast(_date) || isToday(_date)) {
        setIsOverdue(true)
      } else {
        setIsOverdue(false)
      }
    }
  }, [task.dueDate])

  useEffect(() => {
    if (task.attachments) {
      setIsAttachment(true)
    } else setIsAttachment(false)
  }, [task.attachments])

  return (
    <li>
      <Wrapper displayTasksDetails={displayTasksDetails}>
        <CheckboxContainer>
          <Checkbox
            checked={task.status}
            onChange={_toggleIsDone}
            priority={task.priority}
          />
        </CheckboxContainer>
        <Content>
          <Link to={`tasks/${task._id}`} onClick={_showTaskPage}>
            <MainContainer>
              {task.dueDate ? (
                <DatePropertie isOverdue={isOverdue}>
                  {formatDateToDisplay(task.dueDate)}
                </DatePropertie>
              ) : null}

              <Title>{task.title}</Title>

              <PropertiesIcons>
                {isAttachment ? (
                  <AttachmentOutlinedIcon fontSize="inherit" />
                ) : null}
              </PropertiesIcons>
            </MainContainer>
            <DetailsContainer displayTasksDetails={displayTasksDetails}>
              {task.description ? (
                <Description>
                  <DescriptionInner>{task.description}</DescriptionInner>
                </Description>
              ) : null}
            </DetailsContainer>
          </Link>
        </Content>
      </Wrapper>
    </li>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    priority: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
}

export default TaskItem