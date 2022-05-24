/* eslint-disable import/order */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import { useTheme } from "styled-components"
import { showTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../TaskCheckbox/TaskCheckbox"
import {
  Wrapper,
  StyledLink,
  CheckboxContainer,
  MainContainer,
  Title,
  PropertiesIcons,
  Description,
  DescriptionInner,
  TagsContainer,
} from "./TaskItem.style"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import DatePropertie from "../../Pickers/DatePicker/DatePropertie"
import useGetTaskTags from "../../../hooks/query/useGetTaskTags"
import Chip from "../../../components/Chip/Chip"

function TaskItem({ task }) {
  // Query
  // ===========================================================================
  const taskTags = useGetTaskTags(task.tags)

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())

  // Selectors
  // ===========================================================================
  const displayTasksDetails = useSelector((state) => state.tasks.displayDetails)

  // State Hooks
  // ===========================================================================
  const [isFile, setIsFile] = useState(false)

  // ===========================================================================
  // Mutations
  // ===========================================================================
  const updateTask = useUpdateTask(task._id)
  const _toggleStatus = () => updateTask.mutate({ status: !task.status })

  // ===========================================================================
  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (task.files?.length > 0) {
      setIsFile(true)
    } else setIsFile(false)
  }, [task.files])

  // Others
  // ===========================================================================
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [300, -20, 0], opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Wrapper>
        <CheckboxContainer>
          <Checkbox
            checked={task.status}
            onChange={_toggleStatus}
            priority={task.priority}
          />
        </CheckboxContainer>

        <StyledLink to={`tasks/${task._id}`} onClick={_showTaskPage}>
          <MainContainer>
            {task.dueDate ? (
              <DatePropertie
                backgroundColor={theme.tertiary}
                value={task.dueDate}
                displayIcon={false}
              />
            ) : null}

            <Title>{task.title}</Title>

            <PropertiesIcons>
              {isFile ? (
                <InsertDriveFileOutlinedIcon fontSize="inherit" />
              ) : null}
            </PropertiesIcons>
            <TagsContainer>
              {taskTags.map((tag) => (
                <Chip
                  label={tag.tagName}
                  key={tag._id}
                  variant="outlined"
                  size="small"
                />
              ))}
            </TagsContainer>
          </MainContainer>

          {displayTasksDetails && task.description ? (
            <Description>
              <DescriptionInner>{task.description}</DescriptionInner>
            </Description>
          ) : null}
        </StyledLink>
      </Wrapper>
    </motion.div>
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
