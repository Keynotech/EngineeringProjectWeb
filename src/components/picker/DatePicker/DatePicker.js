/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { add } from "date-fns"
import { CalendarPicker } from "@mui/x-date-pickers"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import styled, { useTheme, css } from "styled-components"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import DoNotDisturbOutlinedIcon from "@mui/icons-material/DoNotDisturbOutlined"
import NextWeekOutlinedIcon from "@mui/icons-material/NextWeekOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import { formatDateToDisplay } from "../../../utils/dateConvert"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"
import DateOption from "./DateOption"

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

function DatePicker({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

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
    onChange(dates[0].value)
    setIsOpen(false)
  }

  const setNextWeek = () => {
    onChange(dates[1].value)
    setIsOpen(false)
  }

  const setNextMonth = () => {
    onChange(dates[2].value)
    setIsOpen(false)
  }

  const setNoDate = () => {
    onChange(dates[3].value)
    setIsOpen(false)
  }

  const theme = useTheme()
  return (
    <Dropdown
      isOpen={isOpen}
      toggleComponent={
        <Propertie
          onClick={() => setIsOpen(!isOpen)}
          icon={
            <CalendarMonthOutlinedIcon
              fontSize="inherit"
              sx={{ color: theme.textTertiary }}
            />
          }
          value={value ? formatDateToDisplay(value) : "Due date"}
        />
      }
      menuComponent={
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
      }
    />
  )
}
export default DatePicker
