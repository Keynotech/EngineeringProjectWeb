/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 8px;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${(props) => props.theme.secondary};
    `};
`

const IconWrapper = styled.div`
  display: flex;
  height: 22px;
  min-width: 42px;
  align-items: center;
  font-size: 18px;
`

const NameWrapper = styled.span`
  flex: 1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

function PickerItem({ name, icon, onClick, isActive }) {
  return (
    <Wrapper onClick={onClick} isActive={isActive}>
      <IconWrapper>{icon}</IconWrapper>
      <NameWrapper>{name}</NameWrapper>
    </Wrapper>
  )
}

export default PickerItem
