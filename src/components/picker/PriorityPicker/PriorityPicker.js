/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

export const Item = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  padding: 8px 50px 8px 5px;

  &:hover {
    background-color: ${(props) => props.theme.primary};
  }
`

function PriorityPicker({ value, onChange }) {
  // Others
  // ===========================================================================
  const theme = useTheme()
  const dropdownRef = useRef()
  const prioritiesData = [
    { name: "Urgent", value: 4, color: theme.priority4 },
    { name: "High", value: 3, color: theme.priority3 },
    { name: "Medium", value: 2, color: theme.priority2 },
    { name: "Low", value: 1, color: theme.priority1 },
  ]

  // State Hooks
  // ===========================================================================
  const [selectedColor, setSelectedColor] = useState(theme.priority1)
  const [isOpen, setIsOpen] = useState(false)

  // Effect Hoks
  // ===========================================================================
  useEffect(() => {
    const active = prioritiesData.find((priority) => priority.value === value)
    setSelectedColor(active ? active.color : theme.priority1)
  }, [value])

  return (
    <Dropdown
      isOpen={isOpen}
      ref={dropdownRef}
      toggleComponent={
        <Propertie
          icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
          value={`Priority ${value}`}
          onClick={() => setIsOpen(!isOpen)}
        />
      }
      menuComponent={
        <div>
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
        </div>
      }
    />
  )
}

export default PriorityPicker
