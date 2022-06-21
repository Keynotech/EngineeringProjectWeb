/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

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

function ProjectIcon() {
  return (
    <IconWrapper>
      <Icon />
    </IconWrapper>
  )
}

export default ProjectIcon
