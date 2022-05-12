/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import PropTypes from "prop-types"
import { add } from "date-fns"
import OutsideClickHandler from "react-outside-click-handler"
import { CalendarPicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import styled from "styled-components"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined"
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import Popover from "../../Popover/Popover"
import DateOption from "./DateOption"
import DatePropertie from "./DatePropertie"

const Calendar = styled(CalendarPicker)`
  max-width: 290px;
  & .PrivatePickersSlideTransition-root {
    min-height: 200px;
  }
`

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 14px;
`

function DatePicker({
  value,
  onChange,
  useCapture,
  displayIcon,
  displayValue,
  iconSize,
  backgroundColor,
  border,
}) {
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

  const dates = [
    {
      title: "Tomorrow",
      value: add(new Date(), {
        days: 1,
      }),
    },
    {
      title: "Next Week",
      value: add(new Date(), {
        weeks: 1,
      }),
    },
    {
      title: "Next Month",
      value: add(new Date(), {
        months: 1,
      }),
    },
    { title: value ? "Remove date" : "No date", value: null },
  ]

  const setTomorrow = () => {
    onChange(dates[0].value.toDateString())
    setIsOpen(false)
  }

  const setNextWeek = () => {
    onChange(dates[1].value.toDateString())
    setIsOpen(false)
  }

  const setNextMonth = () => {
    onChange(dates[2].value.toDateString())
    setIsOpen(false)
  }

  const setNoDate = () => {
    onChange(dates[3].value)
    setIsOpen(false)
  }

  return (
    <OutsideClickHandler
      disabled={!isOpen}
      useCapture={useCapture}
      onOutsideClick={handleClose}
    >
      <DatePropertie
        onClick={togglePopover}
        value={value}
        displayIcon={displayIcon}
        displayValue={displayValue}
        iconSize={iconSize}
        backgroundColor={backgroundColor}
        border={border}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Calendar
            showDaysOutsideCurrentMonth
            allowSameDateSelection
            minDate={new Date()}
            value={value}
            onChange={(newValue) => {
              onChange(newValue.toDateString())
              setIsOpen(false)
            }}
          />
          <OptionsWrapper>
            <DateOption
              onClick={setTomorrow}
              title={dates[0].title}
              icon={<WbSunnyOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[0].value}
            />
            <DateOption
              onClick={setNextWeek}
              title={dates[1].title}
              icon={<NextWeekOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[1].value}
            />
            <DateOption
              onClick={setNextMonth}
              title={dates[2].title}
              icon={<DarkModeOutlinedIcon fontSize="inherit" color="inherit" />}
              value={dates[2].value}
            />
            <DateOption
              onClick={setNoDate}
              title={dates[3].title}
              icon={
                <DoNotDisturbOutlinedIcon fontSize="inherit" color="inherit" />
              }
              value={dates[3].value}
            />
          </OptionsWrapper>
        </LocalizationProvider>
      </Popover>
    </OutsideClickHandler>
  )
}

DatePicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  useCapture: PropTypes.bool,
  displayIcon: PropTypes.bool,
  displayValue: PropTypes.bool,
  iconSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
}

DatePicker.defaultProps = {
  value: "",
  useCapture: false,
}

export default DatePicker
