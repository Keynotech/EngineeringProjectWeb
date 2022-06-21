/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React, { useState, forwardRef, useImperativeHandle } from "react"
import styled, { css } from "styled-components"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { DropdownMenu } from "../components/DropdownMenu"

const Wrapper = styled.div`
  min-height: 28px;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
  }

  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 4px 10px 4px 15px;
  width: 100%;
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 18px;
  color: ${(props) => props.theme.textSecondary};
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  max-height: 24px;
  opacity: 0;
  transition: opacity 0.5s;

  ${({ displayMenu }) =>
    displayMenu &&
    css`
      opacity: 1;
    `}
`

const RouteName = styled.span`
  flex: 1;
  font-weight: 600;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ fontWeight }) =>
    fontWeight === "light" &&
    css`
      font-weight: 400;
    `};
`

const SidebarItem = forwardRef((props, ref) => {
  const { icon, name, menuContent, fontWeight, onClick, clickable } = props
  const [displayMenuBtn, toggleDisplayMenuBtn] = useState(false)
  const [menuIsOpen, toggleMenu] = useState(false)

  const onMouseEnter = (event) => {
    event.stopPropagation()
    if (menuContent) {
      toggleDisplayMenuBtn(true)
    }
  }

  const onMouseLeave = (event) => {
    event.stopPropagation()
    if (menuContent) {
      toggleMenu(false)
      toggleDisplayMenuBtn(false)
    }
  }

  useImperativeHandle(ref, () => ({
    hideMenu: () => {
      toggleMenu(false)
    },
  }))

  let menu = null
  if (menuContent) {
    menu = (
      <Menu displayMenu={displayMenuBtn}>
        <DropdownMenu
          outsideClick={() => toggleMenu(false)}
          isOpen={menuIsOpen}
          toggle={
            <MoreHorizIcon
              color="inherit"
              sx={{
                cursor: "pointer",
              }}
              onClick={() => {
                toggleDisplayMenuBtn(false)
                toggleMenu(!menuIsOpen)
              }}
            />
          }
        >
          {menuContent}
        </DropdownMenu>
      </Menu>
    )
  }

  const _onClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <Wrapper
      onClick={_onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      clickable={clickable}
    >
      <Container>
        <IconWrapper> {icon}</IconWrapper>
        <RouteName fontWeight={fontWeight}>{name}</RouteName>
        {menu}
      </Container>
    </Wrapper>
  )
})

export default SidebarItem
