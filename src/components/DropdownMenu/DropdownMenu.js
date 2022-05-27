/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import OutsideClickHandler from "react-outside-click-handler"
import Popover from "../Popover/Popover"

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgb(0 0 0 / 20%);
`

const ToggleContainer = styled.span`
  display: flex;
  align-items: center;
`

function DropdownMenu({ isOpen, outsideClick, toggle, children }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      e.preventDefault()
      e.stopPropagation()
      handleClose()
    } else {
      e.preventDefault()
      e.stopPropagation()
      handleOpen(e)
    }
  }

  return (
    <OutsideClickHandler disabled={!isOpen} onOutsideClick={outsideClick}>
      <ToggleContainer onClick={togglePopover}>{toggle}</ToggleContainer>
      <Popover anchorEl={anchorEl} isOpen={isOpen}>
        <MenuContainer>{children}</MenuContainer>
      </Popover>
    </OutsideClickHandler>
  )
}

export default DropdownMenu
