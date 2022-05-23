/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 5px;
  color: ${(props) => props.theme.textTertiary};
  background-color: ${(props) => props.theme.tertiary};
`

const Icon = styled.span`
  font-size: 16px;
`

const Label = styled.span`
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function Chip({ label, icon }) {
  return (
    <Wrapper>
      {icon ? <Icon>{icon}</Icon> : null}
      {label ? <Label> {label}</Label> : null}
    </Wrapper>
  )
}

export default Chip
