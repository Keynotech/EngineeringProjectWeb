import React, { useState } from "react"
import FilterListIcon from "@mui/icons-material/FilterList"
import styled from "styled-components"
import PropTypes from "prop-types"
import { DropdownMenu } from "../../../components/DropdownMenu"

const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 36px;
  width: 36px;
  background-color: ${(props) => props.theme.tertiary};
  border-radius: 25px;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

function TaskMenu({ children }) {
  // Local State
  // ===========================================================================
  const [menuIsOpen, toggleMenu] = useState(false)
  return (
    <DropdownMenu
      isOpen={menuIsOpen}
      outsideClick={() => toggleMenu(false)}
      toggle={
        <ToggleWrapper onClick={() => toggleMenu(!menuIsOpen)}>
          <FilterListIcon color="inherit" sx={{ fontSize: "26px" }} />
        </ToggleWrapper>
      }
    >
      {children}
    </DropdownMenu>
  )
}

TaskMenu.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TaskMenu
