/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useTheme } from "styled-components"
import FlagIcon from "@mui/icons-material/Flag"
import {
  DropDownWrapper,
  DropDownContainer,
  DropDownItem,
  Propertie,
  PropertieValue,
} from "./PriorityPicker.style"

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
    <Propertie onClick={() => setIsOpen(!isOpen)}>
      <FlagIcon fontSize="inherit" sx={{ color: selectedColor }} />
      <PropertieValue>Priority {value}</PropertieValue>
      <DropDownWrapper isOpen={isOpen}>
        <DropDownContainer>
          {prioritiesData.map((priority) => (
            <DropDownItem
              onClick={() => {
                setIsOpen(false)
                onChange(priority.value)
              }}
              key={priority.value}
            >
              <FlagIcon sx={{ fontSize: "18px", color: priority.color }} />
              {priority.name}
            </DropDownItem>
          ))}
        </DropDownContainer>
      </DropDownWrapper>
    </Propertie>
  )
}

export default PriorityPicker
