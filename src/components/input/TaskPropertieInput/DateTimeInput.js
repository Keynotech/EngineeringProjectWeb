/* eslint-disable react/prop-types */
import React from "react"
import { DateTimePicker } from "@material-ui/pickers"

function DateTimeInput({ value, onChange, isOpen }) {
  return (
    <DateTimePicker
      open={isOpen}
      variant="inline"
      label="Select due date"
      value={value}
      onChange={onChange}
    />
  )
}

export default DateTimeInput
