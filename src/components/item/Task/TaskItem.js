/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css, useTheme } from "styled-components"
import PropTypes from "prop-types"
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { Link } from "react-router-dom"
import { showTaskPage } from "../../../app/store/features/layoutSlice"
import Checkbox from "../../button/Checkbox"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  padding: 10px 8px;

  &:hover {
    background-color: aliceblue;
    border-radius: 4px;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-height: 24px;
  min-width: 32px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  width: 100%;
  min-width: 0px;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
  min-height: 24px;
`

const Date = styled.span`
  flex-shrink: 0;
  margin-right: 8px;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 12px;
  background-color: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.textTertiary};

  ${({ isOverdue }) =>
    isOverdue &&
    css`
      color: ${(props) => props.theme.textError};
    `}
`

const Title = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.textPrimary};
  margin-right: 8px;
`

const PropertiesIcons = styled.div`
  display: flex;
  flex-direction: row;
  flex-shrink: 2;
  overflow: hidden;
  gap: 10px;
  font-size: 14px;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ displayTasksDetails }) =>
    displayTasksDetails &&
    css`
      overflow: visible;
      text-overflow: clip;
      white-space: normal;
    `}
`

const DescriptionInner = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.textTertiary};
`

function TaskItem({ task }) {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [isDone, setIsDone] = useState(task.status)
  const [isOverdue, setIsOverdue] = useState(false)
  const [checkboxColor, setCheckboxColor] = useState(theme.priority1)
  const displayTasksDetails = useSelector((state) => state.tasks.displayDetails)

  const toggleIsDone = () => setIsDone(!isDone)

  useEffect(() => {
    // if task.dueDate < date.now() {}
    //     setIsOverdue(true)
    switch (task.priority) {
      case 1:
        setCheckboxColor(theme.priority1)
        break
      case 2:
        setCheckboxColor(theme.priority2)
        break
      case 3:
        setCheckboxColor(theme.priority3)
        break
      case 4:
        setCheckboxColor(theme.priority4)
        break
      default:
        setCheckboxColor(theme.priority1)
        break
    }
  }, [task.priority])

  return (
    <li>
      <Wrapper displayTasksDetails={displayTasksDetails}>
        <CheckboxContainer>
          <Checkbox
            checked={isDone}
            onChange={toggleIsDone}
            color={checkboxColor}
          />
        </CheckboxContainer>
        <Content>
          <Link
            to={`tasks/${task._id}`}
            onClick={() => dispatch(showTaskPage())}
          >
            <MainContainer>
              <Date isOverdue={isOverdue}>24 Apr, 14:30</Date>
              <Title>{task.title}</Title>
              <PropertiesIcons>
                <FormatListBulletedOutlinedIcon fontSize="inherit" />
                <AttachmentOutlinedIcon fontSize="inherit" />
              </PropertiesIcons>
            </MainContainer>
            <DetailsContainer>
              {task.description ? (
                <Description displayTasksDetails={displayTasksDetails}>
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
