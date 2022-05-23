/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import {
  isPast,
  isToday,
  isTomorrow,
  isThisWeek,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns"
import styled, { css } from "styled-components"
import { formatDateToDisplay } from "../../utils/dateConvert"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.textTertiary};

  ${({ overdue }) =>
    overdue &&
    css`
      color: ${(props) => props.theme.textError};
    `}
`
const Value = styled.span`
  font-size: 12px;
  font-weight: 500;
`

function DatePropertie({
  value,
  displayValue,
  displayIcon,
  onClick,
  iconSize,
  backgroundColor,
  border,
}) {
  const [date, setDate] = useState(value)
  const [overdue, setIsOverdue] = useState(false)
  const [tomorrow, setIsTomorrow] = useState(false)

  useEffect(() => {
    if (value) {
      const _date = new Date(value)

      if (isPast(_date)) {
        setIsOverdue(true)
        if (isToday(_date)) setDate("Today")
        else {
          setDate(formatDateToDisplay(value))
        }
      } else {
        setIsOverdue(false)
        if (isThisWeek(_date)) {
          if (isTomorrow(_date)) setDate("Tomorrow")
          else if (isMonday(_date)) setDate("Monday")
          else if (isTuesday(_date)) setDate("Tuesday")
          else if (isWednesday(_date)) setDate("Wednesday")
          else if (isThursday(_date)) setDate("Thursday")
          else if (isFriday(_date)) setDate("Friday")
          else if (isSaturday(_date)) setDate("Saturday")
          else if (isSunday(_date)) setDate("Sunday")
        } else setDate(formatDateToDisplay(value))
      }
    } else {
      setIsOverdue(false)
    }
  }, [value])

  return (
    <Wrapper
      style={{ backgroundColor, border }}
      onClick={onClick}
      overdue={overdue}
      tomorrow={tomorrow}
    >
      {displayIcon ? (
        <CalendarMonthIcon
          sx={{ fontSize: iconSize || "16px" }}
          color="inherit"
        />
      ) : null}
      {displayValue ? <Value>{value ? date : "Due date"}</Value> : null}
    </Wrapper>
  )
}

DatePropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
  iconSize: PropTypes.number,
}

DatePropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default DatePropertie
