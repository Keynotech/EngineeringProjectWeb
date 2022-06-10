import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const MenuList = styled.div``

function SidebarList({ children, style }) {
  return <MenuList style={style}>{children}</MenuList>
}

SidebarList.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

SidebarList.defaultProps = {
  children: null,
  style: null,
}

export default SidebarList
