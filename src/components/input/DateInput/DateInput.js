/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { CalendarPicker } from "@mui/x-date-pickers"
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { useTheme } from "styled-components"
import { formatDateToDisplay } from "../../../utils/dateConvert"
import {
  Wrapper,
  DropDownWrapper,
  DropDownContainer,
  DatePickerWrapper,
  Propertie,
  PropertieValue,
} from "./DateInput.style"

function DateTimeInput({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const theme = useTheme()
  return (
    <Wrapper>
      <Propertie onClick={() => setIsOpen(!isOpen)}>
        <CalendarMonthOutlinedIcon
          fontSize="inherit"
          sx={{ color: theme.textTertiary }}
        />
        <PropertieValue>
          {value ? formatDateToDisplay(value) : "Due date"}
        </PropertieValue>
      </Propertie>
      <DropDownWrapper isOpen={isOpen}>
        <DropDownContainer>
          <DatePickerWrapper>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CalendarPicker
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
          </DatePickerWrapper>
        </DropDownContainer>
      </DropDownWrapper>
    </Wrapper>
  )
}
export default DateTimeInput
