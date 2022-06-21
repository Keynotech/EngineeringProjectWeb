/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const IconWrapper = styled.div`
  display: flex;
  height: 22px;
  min-width: 42px;
  align-items: center;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
`

function TagIcon() {
  return (
    <IconWrapper>
      <Icon />
    </IconWrapper>
  )
}

export default TagIcon
