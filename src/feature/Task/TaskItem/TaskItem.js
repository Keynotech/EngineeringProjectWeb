/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { useSelector, useDispatch } from "react-redux"
import PropTypes from "prop-types"
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined"
import { useTheme } from "styled-components"
import { hideTaskPage, showTaskPage } from "../../../store/features/layoutSlice"
import Checkbox from "../TaskCheckbox/TaskCheckbox"
import {
  Wrapper,
  StyledLink,
  CheckboxContainer,
  MainContainer,
  MainWrapper,
  Title,
  PropertiesIcons,
  ProjectInfo,
  AdditionalContainer,
  TagsContainer,
} from "./TaskItem.style"
import useUpdateTask from "../../../hooks/mutation/useUpdateTask"
import DatePropertie from "../../Propertie/DatePropertie/DatePropertie"
import ProjectPropertie from "../../Propertie/ProjectPropertie/ProjectPropertie"
import useGetTaskTags from "../../../hooks/query/useGetTaskTags"
import useWindowSize from "../../../hooks/useWindowSize"
import Chip from "../../../components/Chip/Chip"
import { useNavigate } from "react-router-dom"
import { size } from "../../../utils/mq"

function TaskItem({ task }) {
  // Query
  // ===========================================================================
  const taskTags = useGetTaskTags(task ? task.tags : [])

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())
  const _hideTaskPage = () => dispatch(hideTaskPage())

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
  const navigate = useNavigate()
  const windowSize = useWindowSize()
  const { t } = useTranslation()

  let tags = null
  if (taskTags) {
    if (windowSize.width < size.tablet) {
      let translation
      const tagsCount = task.tags.length
      if (tagsCount === 0 || tagsCount > 4) {
        translation = t("tags.tags2")
      } else if (tags === 1) {
        translation = t("tags.tag")
      } else {
        translation = t("tags.tags")
      }
      tags = (
        <Chip
          label={`${tagsCount} ${translation}`}
          variant="outlined"
          size="small"
        />
      )
    } else {
      tags = taskTags?.map((tag) => (
        <Chip
          onClick={() => {
            _hideTaskPage()
            navigate(`/tag/${tag._id}`)
          }}
          label={tag?.tagName}
          key={tag?._id}
          variant="outlined"
          size="small"
          clickable
        />
      ))
    }
  }

  let project = null
  if (task.project) {
    project = (
      <ProjectInfo>
        <ProjectPropertie displayIcon={false} value={task.project} />
      </ProjectInfo>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ x: [300, -20, 0], opacity: 1 }}
      exit={{ x: 500, opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <StyledLink to={`tasks/${task._id}`} onClick={_showTaskPage}>
        <Wrapper isDone={task.status}>
          <CheckboxContainer>
            <Checkbox
              checked={task.status}
              onChange={_toggleStatus}
              priority={task.priority}
            />
          </CheckboxContainer>
          <MainWrapper>
            <MainContainer>
              <Title>{task.title}</Title>
              <PropertiesIcons>
                {isFile ? (
                  <InsertDriveFileOutlinedIcon fontSize="inherit" />
                ) : null}
              </PropertiesIcons>
              <TagsContainer>{tags}</TagsContainer>
            </MainContainer>
            {task.dueDate || project ? (
              <AdditionalContainer>
                {task.dueDate ? (
                  <DatePropertie
                    backgroundColor={theme.tertiary}
                    value={task.dueDate}
                    variant="standard"
                    displayIcon={false}
                  />
                ) : null}
                {project}
              </AdditionalContainer>
            ) : null}
          </MainWrapper>
        </Wrapper>
      </StyledLink>
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
