import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { hideSidebar, hideTaskPage } from "../../store/features/layoutSlice"
import { size } from "../../utils/mq"

const Link = styled(NavLink)`
  transition: background-color 0.25s ease-in;

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
  }

  &.active {
    background-color: ${(props) => props.theme.tertiary};
  }
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  width: 28px;
  height: 24px;
  margin-right: 5px;
  font-size: 18px;

  color: ${(props) => props.theme.textSecondary};
`

const RouteName = styled.span`
  font-weight: 600;
`

function SidebarItem({ icon, name, route }) {
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

  return (
    <li>
      <Link
        to={route}
        onClick={() => {
          _hideTaskPage()
          hideSidebarOnMobile()
        }}
      >
        <Icon> {icon}</Icon>
        <RouteName>{name}</RouteName>
      </Link>
    </li>
  )
}

SidebarItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

export default SidebarItem
