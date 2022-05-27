import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const MenuList = styled.div``

function SidebarList({ children }) {
  return <MenuList>{children}</MenuList>
}

SidebarList.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SidebarList
