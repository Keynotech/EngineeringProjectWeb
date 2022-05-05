/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react"
import styled, { useTheme } from "styled-components"
import StarIcon from "@mui/icons-material/Star"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

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

function PriorityPicker({ value, onChange }) {
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
      toggleComponent={
        <Propertie
          icon={<StarIcon fontSize="inherit" sx={{ color: selectedColor }} />}
          value={
            prioritiesData.find((priority) => priority.value === value).name
          }
          onClick={() => setIsOpen(!isOpen)}
        />
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
  )
}

export default PriorityPicker
