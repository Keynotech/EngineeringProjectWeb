/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { format } from "date-fns"
import styled, { css, useTheme } from "styled-components"
import { useParams } from "react-router-dom"
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import LastPageIcon from "@mui/icons-material/LastPage"
import { hideTaskPage } from "../../../app/store/features/layoutSlice"
import Checkbox from "../../button/Checkbox"
import DescriptionInput from "../../input/DescriptionInput"
import { useTaskQuery, useUpdateTask } from "../../../app/api/api"

const Wrapper = styled.div`
  position: fixed;
  top: 49px;
  right: -450px;
  width: min(420px, 100vw);
  height: calc(100vh - 48px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  &::-webkit-scrollbar {
    display: none;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      right: 0px;
    `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${(props) => props.theme.secondary};
`
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 32px;
`

const TitleContainer = styled.div`
  min-width: 0;
  max-width: 100%;
  flex: 1;
`
const Title = styled.span`
  font-size: 16px;
  word-break: break-word;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  max-width: 100%;
  color: ${(props) => props.theme.textSecondary};
  padding: 0 15px;
`

const SectionHeader = styled.span`
  font-weight: 600;
`

const PropertiesContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`

const Propertie = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  gap: 5px;
  color: ${(props) => props.theme.textTertiary};
  font-size: 18px;
  padding: 2px 6px;
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
`
const PropertieValue = styled.span`
  font-size: 12px;
`

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  padding: 8px 15px;
  font-size: 12px;
  color: ${(props) => props.theme.textTertiary};
`

const AttachmentsContainer = styled.div``

function TaskPage() {
  let { taskId } = useParams()
  const task = useTaskQuery(taskId)
  const dispatch = useDispatch()
  const theme = useTheme()
  const updateTask = useUpdateTask(taskId)

  const isVisible = useSelector((state) => state.layout.taskPageVisibility)

  const changeDesc = (value) => updateTask.mutate({ description: value })

  return task.isSuccess ? (
    <Wrapper isVisible={isVisible}>
      <Container>
        <MainContainer>
          <CheckboxContainer>
            <Checkbox
              checked={task.data.status}
              priority={task.data.priority}
              onChange={() => {
                updateTask.mutate({
                  status: !task.data.status,
                })
              }}
            />
          </CheckboxContainer>
          <TitleContainer>
            <Title>
              {task.data.title} {task.data.status.toString()}
            </Title>
          </TitleContainer>
          <LastPageIcon
            onClick={() => dispatch(hideTaskPage())}
            sx={{ color: theme.textSecondary }}
          />
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
            <DescriptionInput
              value={task.data.description}
              onChange={changeDesc}
            />
          </SectionContainer>

          <SectionContainer>
            <SectionHeader>Attachments</SectionHeader>
          </SectionContainer>
        </DetailsContainer>
        <Footer>Updated at {format(new Date(task.data.updated), "Pp")}</Footer>
      </Container>
    </Wrapper>
  ) : null
}

export default TaskPage
