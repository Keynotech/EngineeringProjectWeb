/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined"
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined"
import { Link } from "react-router-dom"
import { showTaskPage } from "../../../app/store/features/layoutSlice"
import Checkbox from "../../button/Checkbox"
import { useUpdateTaskOnList } from "../../../app/api/api"

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
  display: none;
  ${({ displayTasksDetails }) =>
    displayTasksDetails &&
    css`
      display: flex;
      flex-direction: column;
    `}
`

const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const DescriptionInner = styled.span`
  font-size: 12px;
  line-height: 18px;
  color: ${(props) => props.theme.textTertiary};
`

function TaskItem({ task }) {
  const dispatch = useDispatch()
  const updateTask = useUpdateTaskOnList(task._id)
  const [isOverdue, setIsOverdue] = useState(false)
  const [isAttachment, setIsAttachment] = useState(false)
  const displayTasksDetails = useSelector((state) => state.tasks.displayDetails)

  useEffect(() => {}, [task.dueDate])
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
            onChange={() =>
              updateTask.mutate({
                status: !task.status,
              })
            }
            priority={task.priority}
          />
        </CheckboxContainer>
        <Content>
          <Link
            to={`tasks/${task._id}`}
            onClick={() => dispatch(showTaskPage())}
          >
            <MainContainer>
              <Date isOverdue={isOverdue}>s</Date>
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
