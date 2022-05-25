import React, { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import styled from "styled-components"
import PropTypes from "prop-types"
import Popover from "../../../../components/Popover/Popover"
import { DropdownItemMenu } from "../../../../components/DropdownMenu"

const Wrapper = styled.div`
  min-width: 200px;
`

function Item({ children }) {
  // Local State
  // ===========================================================================
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen(e)
    }
  }

  return (
    <OutsideClickHandler disabled={!isOpen} onOutsideClick={handleClose}>
      <DropdownItemMenu onClick={togglePopover} />
      <Popover isOpen={isOpen} anchorEl={anchorEl}>
        <Wrapper>{children}</Wrapper>
      </Popover>
    </OutsideClickHandler>
  )
}

Item.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Item
