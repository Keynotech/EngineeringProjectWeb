/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useRef } from "react"
import styled from "styled-components"
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
    e.preventDefault()
    e.stopPropagation()
    if (isOpen) {
      handleClose()
    } else {
      handleOpen(e)
    }
  }

  const _outsideClick = () => {
    if (outsideClick) {
      outsideClick()
      handleClose()
    }
  }

  return (
    <>
      <ToggleContainer onClick={togglePopover}>{toggle}</ToggleContainer>
      <Popover
        anchorEl={anchorEl}
        isOpen={isOpen}
        handleClose={handleClose}
        onOutsideClick={_outsideClick}
      >
        <MenuContainer onClick={_outsideClick}>{children}</MenuContainer>
      </Popover>
    </>
  )
}

export default DropdownMenu
