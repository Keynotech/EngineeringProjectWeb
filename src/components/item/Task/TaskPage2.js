/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { useParams } from "react-router-dom"
import { toggleTaskPage } from "../../../app/store/features/layoutSlice"
import Checkbox from "../../button/Checkbox"
import DescriptionInput from "../../input/DescriptionInput"
import { useTaskQuery } from "../../../app/api/api"

const Wrapper = styled.div`
  position: fixed;
  top: 48px;
  right: -500px;
  width: min(420px, 100vw);
  height: calc(100vh - 48px);
  overflow-y: auto;
  background-color: ${(props) => props.theme.primary};
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

const WrapperInner = styled.div`
  padding: 30px 12px;
  max-width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid red;
  color: ${(props) => props.theme.textPrimary};
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 24px;
  margin-bottom: 30px;
  width: 100%;
  background-color: red;
`

const CheckboxContainer = styled.div`
  display: flex;
  min-height: 24px;
  min-width: 32px;
`

const TitleContainer = styled.div`
  min-width: 0;
  max-width: 100%;
`
const Title = styled.span`
  font-size: 16px;
  word-break: break-word;
`

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: beige;
  padding: 0 12px;
  gap: 10px;
`

const SectionHeader = styled.span`
  font-weight: 600;
`

const DescriptionContainer = styled.div`
  min-height: 0;
  height: auto;
`

const PropertiesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 12px;
`

const Propertie = styled.div``

function TaskPage() {
  let { taskId } = useParams()
  const task = useTaskQuery(taskId)
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.layout.taskPageVisibility)

  return task.isSuccess ? (
    <Wrapper isVisible={isVisible}>
      <WrapperInner>
        <Container>
          <Header>
            <CheckboxContainer>
              <Checkbox
                checked={task.data.status}
                color="#eee"
                onChange={() => null}
              />
            </CheckboxContainer>
            <TitleContainer>
              <Title>
                {task.data.title}
                {task.data.title}
                {task.data.title}
                {task.data.title}
                {task.data.title}
                {task.data.title}
              </Title>
            </TitleContainer>
          </Header>

          <DetailsContainer>
            <SectionWrapper>
              <SectionHeader>Description</SectionHeader>
              <DescriptionContainer>
                <DescriptionInput value={task.data.description} />
              </DescriptionContainer>
            </SectionWrapper>
          </DetailsContainer>
        </Container>
      </WrapperInner>
    </Wrapper>
  ) : null
}

export default TaskPage
