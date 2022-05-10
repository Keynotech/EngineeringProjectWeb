/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { isPast, isToday, isTomorrow } from "date-fns"
import styled, { css } from "styled-components"
import { mq } from "../../utils/mq"
import { convertDateToJS, formatDateToDisplay } from "../../utils/dateConvert"

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

  ${({ overdue }) =>
    overdue &&
    css`
      color: ${(props) => props.theme.textError};
    `}
`
export const Value = styled.span`
  font-size: 12px;

  @media ${mq.desktopL} {
    font-size: 14px;
  }
`

function DatePropertie({
  value,
  displayValue,
  displayIcon,
  onClick,
  iconSize,
}) {
  const [overdue, setIsOverdue] = useState(false)
  const [tomorrow, setIsTomorrow] = useState(false)

  useEffect(() => {
    if (value) {
      const _date = convertDateToJS(value)
      if (isPast(_date) || isToday(_date)) {
        setIsOverdue(true)
      } else {
        setIsOverdue(false)
      }
      if (isTomorrow(_date)) {
        setIsTomorrow(true)
      } else {
        setIsTomorrow(false)
      }
    }
  }, [value])

  return (
    <Wrapper onClick={onClick} overdue={overdue} tomorrow={tomorrow}>
      {displayIcon ? (
        <CalendarMonthIcon fontSize={iconSize || "inherit"} color="inherit" />
      ) : null}
      {displayValue ? (
        <Value>{value ? formatDateToDisplay(value) : "Due date"}</Value>
      ) : null}
    </Wrapper>
  )
}

DatePropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
  iconSize: PropTypes.string,
}

DatePropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default DatePropertie
