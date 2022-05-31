/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React, { useState } from "react"
import styled, { css } from "styled-components"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PropTypes from "prop-types"
import { DropdownMenu } from "../../components/DropdownMenu"

const Wrapper = styled.div`
  min-height: 28px;

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
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 4px 10px 4px 20px;
`

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 24px;
  margin-right: 5px;
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

function SidebarItem({
  icon,
  name,
  menuContent,
  fontWeight,
  onClick,
  clickable,
}) {
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
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  fontWeight: PropTypes.oneOf(["light", "bold"]),
  clickable: PropTypes.bool,
}

SidebarItem.defaultProps = {
  fontWeight: "bold",
  clickable: false,
}

export default SidebarItem
