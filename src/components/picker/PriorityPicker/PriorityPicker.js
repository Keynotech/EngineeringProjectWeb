/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import PropTypes from "prop-types"
import OutsideClickHandler from "react-outside-click-handler"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Dropdown from "../../Dropdown/Dropdown"
import PriorityPropertie from "../../propertie/PriorityPropertie"

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

function PriorityPicker({ value, onChange, useCapture }) {
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

  // Effect Hoks
  // ===========================================================================

  return (
    <OutsideClickHandler
      disabled={!isOpen}
      useCapture={useCapture}
      onOutsideClick={() => setIsOpen(false)}
    >
      <Dropdown
        isOpen={isOpen}
        toggleComponent={
          <PriorityPropertie value={value} onClick={() => setIsOpen(!isOpen)} />
        }
        menuComponent={
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
        }
      />
    </OutsideClickHandler>
  )
}

PriorityPicker.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  useCapture: PropTypes.bool,
}

PriorityPicker.defaultProps = {
  useCapture: false,
}

export default PriorityPicker
