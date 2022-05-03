/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

export const Item = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 6px;

  &:hover {
    background-color: ${(props) => props.theme.primary};
  }
`

function PriorityPicker({ value, onChange }) {
  const theme = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(theme.priority1)

  const prioritiesData = [
    { name: "Priority 1", value: 1, color: theme.priority1 },
    { name: "Priority 2", value: 2, color: theme.priority2 },
    { name: "Priority 3", value: 3, color: theme.priority3 },
    { name: "Priority 4", value: 4, color: theme.priority4 },
  ]

  useEffect(() => {
    const active = prioritiesData.find((priority) => priority.value === value)
    setSelectedColor(active ? active.color : theme.priority1)
  }, [value])

  return (
    <>
      <Propertie
        icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
        value={`Priority ${value}`}
        onClick={() => setIsOpen(!isOpen)}
      />
      <Dropdown isOpen={isOpen}>
        {prioritiesData.map((priority) => (
          <Item
            onClick={() => {
              setIsOpen(false)
              onChange(priority.value)
            }}
            key={priority.value}
          >
            <StarIcon sx={{ fontSize: "18px", color: priority.color }} />
            {priority.name}
          </Item>
        ))}
      </Dropdown>
    </>
  )
}

export default PriorityPicker
