/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import StarIcon from "@mui/icons-material/Star"
import styled, { useTheme } from "styled-components"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.textTertiary};
`
const Value = styled.span`
  font-size: 12px;
  font-weight: 500;
`

function PriorityPropertie({
  value,
  prioritiesData,
  displayValue,
  displayIcon,
  onClick,
  iconSize,
  backgroundColor,
  border,
}) {
  const theme = useTheme()
  const [selectedColor, setSelectedColor] = useState(theme.priority1)

  useEffect(() => {
    const active = prioritiesData.find((priority) => priority.value === value)
    setSelectedColor(active ? active.color : theme.priority1)
  }, [value])

  return (
    <Wrapper style={{ backgroundColor, border }} onClick={onClick}>
      {displayIcon ? (
        <StarIcon sx={{ fontSize: iconSize || "16px", color: selectedColor }} />
      ) : null}
      {displayValue ? (
        <Value>
          {prioritiesData.find((priority) => priority.value === value).name}
        </Value>
      ) : null}
    </Wrapper>
  )
}

PriorityPropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
  iconSize: PropTypes.number,
}

PriorityPropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default PriorityPropertie
