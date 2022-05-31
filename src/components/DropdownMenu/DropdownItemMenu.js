/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const MenuItem = styled.button`
  width: 280px;
  min-height: 32px;
  overflow: visible;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 15px 5px 20px;
  gap: 14px;
  color: ${(props) => props.theme.textPrimary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  span {
    font-size: 14px;
  }
`

const IconWrapper = styled.span`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const RightWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`

const MenuLabel = styled.span`
  flex: 1;
  font-weight: 400;
  text-align: left;
`

function DropdownItemMenu({
  label,
  onClick,
  leftIcon: leftIconProp,
  rightComponent: rightComponentProp,
}) {
  let icon = null
  if (leftIconProp) {
    icon = <IconWrapper>{leftIconProp}</IconWrapper>
  }

  let rightComponent = null
  if (rightComponentProp) {
    rightComponent = <RightWrapper>{rightComponentProp}</RightWrapper>
  }

  const _onClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick()
    }
  }

  return (
    <MenuItem onClick={(e) => _onClick(e)}>
      {icon}
      <MenuLabel>{label}</MenuLabel>
      {rightComponent}
    </MenuItem>
  )
}

export default DropdownItemMenu
