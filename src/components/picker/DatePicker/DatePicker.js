/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef } from "react"
import { CalendarPicker } from "@mui/x-date-pickers"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useTheme } from "styled-components"
import { formatDateToDisplay } from "../../../utils/dateConvert"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

function DatePicker({ value, onChange }) {
  const dropdownRef = useRef()
  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()
  return (
    <Dropdown
      isOpen={isOpen}
      ref={dropdownRef}
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
          <CalendarPicker
            showDaysOutsideCurrentMonth
            allowSameDateSelection
            displayStaticWrapperAs="desktop"
            minDate={new Date()}
            value={value}
            onChange={(newValue) => {
              onChange(newValue.toDateString())
              setIsOpen(false)
            }}
          />
        </LocalizationProvider>
      }
    />
  )
}
export default DatePicker
