/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import StarIcon from "@mui/icons-material/Star"
import styled, { useTheme } from "styled-components"
import { mq } from "../../utils/mq"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.textTertiary};

  @media ${mq.desktopL} {
    padding: 4px 14px;
  }
`
export const Value = styled.span`
  font-size: 12px;

  @media ${mq.desktopL} {
    font-size: 14px;
  }
`

function PriorityPropertie({
  value,
  displayValue,
  displayIcon,
  onClick,
  iconSize,
}) {
  const theme = useTheme()
  const [selectedColor, setSelectedColor] = useState(theme.priority1)

  const prioritiesData = [
    { name: "Urgent", value: 4, color: theme.priority4 },
    { name: "High", value: 3, color: theme.priority3 },
    { name: "Medium", value: 2, color: theme.priority2 },
    { name: "Low", value: 1, color: theme.priority1 },
  ]

  useEffect(() => {
    const active = prioritiesData.find((priority) => priority.value === value)
    setSelectedColor(active ? active.color : theme.priority1)
  }, [value])

  return (
    <Wrapper onClick={onClick}>
      {displayIcon ? (
        <StarIcon
          fontSize={iconSize || "inherit"}
          sx={{ color: selectedColor }}
        />
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
  iconSize: PropTypes.string,
}

PriorityPropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default PriorityPropertie
