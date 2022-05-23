/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import OutsideClickHandler from "react-outside-click-handler"
import Popover from "../Popover/Popover"

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const MenuItem = styled.button`
  display: flex;
  width: 100%;
  overflow: visible;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 20px 8px 12px;
  box-sizing: border-box;
  font-size: 16px;
  color: ${(props) => props.theme.textTertiary};
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  span {
    font-size: 14px;
  }
`

const ToggleContainer = styled.span`
  display: flex;
  align-items: center;
`

function DropdownMenu({ isOpen, outsideClick, toggle, menuItems }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen(e)
    }
  }

  return menuItems ? (
    <OutsideClickHandler disabled={!isOpen} onOutsideClick={outsideClick}>
      <ToggleContainer onClick={togglePopover}>{toggle}</ToggleContainer>
      <Popover anchorEl={anchorEl} isOpen={isOpen}>
        <MenuContainer>
          {menuItems.map((elem) => (
            <MenuItem key={elem.title} type="button" onClick={elem.onClick}>
              {elem.icon}
              <span>{elem.title}</span>
            </MenuItem>
          ))}
        </MenuContainer>
      </Popover>
    </OutsideClickHandler>
  ) : null
}

export default DropdownMenu
