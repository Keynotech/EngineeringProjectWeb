/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */

import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { NavLink } from "react-router-dom"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import PropTypes from "prop-types"
import { hideSidebar, hideTaskPage } from "../../store/features/layoutSlice"
import { size } from "../../utils/mq"
import { DropdownMenu } from "../../components/DropdownMenu"

const Link = styled(NavLink)`
  display: inline-block;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
  }
  &.active {
    background-color: ${(props) => props.theme.tertiary};
  }
`

const Wrapper = styled.div`
  min-height: 28px;
`

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px 5px 20px;
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

  ${({ fontWeight }) =>
    fontWeight === "light" &&
    css`
      font-weight: 400;
    `};
`

function SidebarItem({
  icon,
  name,
  route,
  menuContent,
  fontWeight,
  as,
  onClick,
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

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())
  const _hideSidebar = () => dispatch(hideSidebar())

  const hideSidebarOnMobile = () => {
    if (window.innerWidth <= size.laptop) {
      _hideSidebar()
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
    _hideTaskPage()
    hideSidebarOnMobile()
    if (onClick) {
      onClick()
    }
  }

  return (
    <Wrapper onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link as={as} to={route} onClick={_onClick}>
        <Container>
          <IconWrapper> {icon}</IconWrapper>
          <RouteName fontWeight={fontWeight}>{name}</RouteName>
          {menu}
        </Container>
      </Link>
    </Wrapper>
  )
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string,
  fontWeight: PropTypes.oneOf(["light", "bold"]),
}

SidebarItem.defaultProps = {
  fontWeight: "bold",
}

export default SidebarItem
