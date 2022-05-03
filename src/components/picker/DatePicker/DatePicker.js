/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { CalendarPicker } from "@mui/x-date-pickers"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useTheme } from "styled-components"
import { formatDateToDisplay } from "../../../utils/dateConvert"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

function DatePicker({ value, onChange, dropdownTo }) {
  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()
  return (
    <>
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

      <Dropdown isOpen={isOpen}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <CalendarPicker
            showDaysOutsideCurrentMonth
            allowSameDateSelection
            displayStaticWrapperAs="desktop"
            minDate={new Date()}
            value={value}
            onChange={(newValue) => {
              setIsOpen(false)
              onChange(newValue.toDateString())
            }}
          />
        </LocalizationProvider>
      </Dropdown>
    </>
  )
}
export default DatePicker
