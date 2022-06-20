/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  max-height: 24px;
  margin-right: 8px;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
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
