/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { mq } from "../../utils/mq"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 20px;
  gap: 5px;
  color: ${(props) => props.theme.textTertiary};
  font-size: 18px;
  padding: 2px 6px;
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
  cursor: pointer;

  @media ${mq.desktopL} {
    padding: 2px 14px;
  }
`
export const PropertieValue = styled.span`
  font-size: 12px;

  @media ${mq.desktopL} {
    font-size: 14px;
  }
`

function DefaultPropertie({ value, icon, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      {icon}
      <PropertieValue>{value}</PropertieValue>
    </Wrapper>
  )
}

export default DefaultPropertie
