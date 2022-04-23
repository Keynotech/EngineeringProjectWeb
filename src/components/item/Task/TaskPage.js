/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { useParams } from "react-router-dom"
import { toggleTaskPage } from "../../../app/store/features/layoutSlice"
import Checkbox from "../../button/Checkbox"

const Wrapper = styled.div`
  width: min(420px, 100vw);
  height: calc(100vh - 48px);
  position: fixed;
  top: 48px;
  right: -500px;
  background-color: ${(props) => props.theme.primary};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ isVisible }) =>
    isVisible &&
    css`
      right: 0px;
    `}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${(props) => props.theme.textPrimary};
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 24px;
  padding: 30px 12px;

  padding-bottom: 15px;
  margin-bottom: 30px;
  border-bottom: 2px solid ${(props) => props.theme.tertiary};
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

const PropertiesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 12px;
`

const Propertie = styled.div``

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 0px 12px;
`

const SectionHeader = styled.span`
  font-weight: 600;
`

const SectionInner = styled.div``

const Description = styled.span`
  font-size: 14px;
  color: ${(props) => props.theme.textSecondary};
`

function TaskPage() {
  let { taskId } = useParams()
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.layout.taskPageVisibility)

  return (
    <Wrapper isVisible={isVisible}>
      <Container>
        <Header>
          <CheckboxContainer>
            <Checkbox checked color="#eee" onChange={() => null} />
          </CheckboxContainer>
          <TitleContainer>
            <Title>
              6258507fd01dfc16ca8277277c5ad6258507fd01dfc16ca8277277c5ad
            </Title>
          </TitleContainer>
        </Header>
        <PropertiesWrapper>
          <Propertie>27 April 2022 12:00</Propertie>
          <Propertie>Priority 4</Propertie>
        </PropertiesWrapper>
        <SectionWrapper>
          <SectionHeader>Description</SectionHeader>
          <SectionInner>
            <Description>Lorem ispum</Description>
          </SectionInner>
        </SectionWrapper>
        <SectionWrapper>
          <SectionHeader>Attachments</SectionHeader>
          <SectionInner>Upload file</SectionInner>
        </SectionWrapper>
        <button type="button" onClick={() => dispatch(toggleTaskPage())}>
          Toggle
        </button>
      </Container>
    </Wrapper>
  )
}

export default TaskPage
