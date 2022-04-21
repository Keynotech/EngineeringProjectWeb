import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import { hideSidebar } from "../../app/store/features/sidebarSlice"

const Link = styled(NavLink)`
  transition: all 0.25s ease-in;

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
  font-weight: 500;
`

function NavItem({ icon, name, route }) {
  const dispatch = useDispatch()

  const hideSidebarOnMobile = () => {
    if (window.innerWidth <= 768) {
      dispatch(hideSidebar())
    }
  }

  return (
    <li>
      <Link to={route} onClick={() => hideSidebarOnMobile()}>
        <Icon> {icon}</Icon>
        <RouteName>{name}</RouteName>
      </Link>
    </li>
  )
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
}

export default NavItem
