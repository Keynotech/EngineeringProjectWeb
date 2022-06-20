/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`

const IconWrapper = styled.div`
  display: flex;
  height: 22px;
  min-width: 42px;
  align-items: center;
`

const Icon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 6px;
  border: 2px solid ${(props) => props.theme.textTertiary};
`

const Title = styled.span`
  flex: 1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

function ProjectItem({ project }) {
  return (
    <Wrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Title>{project ? project.projectName : ""}</Title>
    </Wrapper>
  )
}

export default ProjectItem
