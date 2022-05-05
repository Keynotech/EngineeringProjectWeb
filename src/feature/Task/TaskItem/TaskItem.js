/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { isPast, isToday } from "date-fns"
import PropTypes from "prop-types"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import { Link } from "react-router-dom"
import { showTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../../../components/button/Checkbox"
import TagDisplayInTask from "../../Tag/TagDisplayInTask/TagDisplayInTask"
import { useUpdateTaskOnList } from "../../../api/api"
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
  TagsContainer,
} from "./TaskItem.style"
import {
  convertDateToJS,
  formatDateToDisplay,
} from "../../../utils/dateConvert"

function TaskItem({ task }) {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())

  // Selectors
  // ===========================================================================
  const displayTasksDetails = useSelector((state) => state.tasks.displayDetails)

  // State Hooks
  // ===========================================================================
  const [isOverdue, setIsOverdue] = useState(false)
  const [isAttachment, setIsAttachment] = useState(false)

  // ===========================================================================
  // Mutations
  // ===========================================================================
  const updateTask = useUpdateTaskOnList(task._id)
  const _toggleIsDone = () => updateTask.mutate({ status: !task.status })

  // ===========================================================================
  // Effect Hooks
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
                  <InsertDriveFileOutlinedIcon fontSize="inherit" />
                ) : null}
              </PropertiesIcons>

              <TagsContainer>
                {task.tags?.map((tag) => (
                  <TagDisplayInTask key={tag} tagId={tag} />
                ))}
              </TagsContainer>
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
    _id: PropTypes.string,
    title: PropTypes.string,
    status: PropTypes.bool,
    priority: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
}

export default TaskItem
