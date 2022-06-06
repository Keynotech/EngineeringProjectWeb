/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Popover from "../../../components/Popover/Popover"
// import PriorityPropertie from "./PriorityPropertie"
import PriorityPropertie from "../../Propertie/PriorityPropertie/PriorityPropertie"

const Wrapper = styled.div`
  width: 200px;
  max-width: 100vw;
`

const Item = styled.div`
  display: flex;
  width: 100%;
  overflow: visible;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

function PriorityPicker({ value, onChange, variant }) {
  // Others
  // ===========================================================================
  const theme = useTheme()

  const prioritiesData = [
    { name: "Urgent", value: 4, color: theme.priority4 },
    { name: "High", value: 3, color: theme.priority3 },
    { name: "Medium", value: 2, color: theme.priority2 },
    { name: "Low", value: 1, color: theme.priority1 },
  ]

  // State Hooks
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
    <>
      <PriorityPropertie
        prioritiesData={prioritiesData}
        value={value}
        onClick={togglePopover}
        variant={variant}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          {prioritiesData.map((priority) => (
            <Item
              onClick={() => {
                onChange(priority.value)
                setIsOpen(false)
              }}
              key={priority.value}
            >
              <StarIcon sx={{ fontSize: "18px", color: priority.color }} />
              {priority.name}
            </Item>
          ))}
        </Wrapper>
      </Popover>
    </>
  )
}

PriorityPicker.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.string,
}

export default PriorityPicker
