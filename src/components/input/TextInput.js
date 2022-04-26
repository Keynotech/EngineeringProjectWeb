/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import { Input } from "@mui/material"

function TextInput({
  value,
  onChange,
  multiline,
  maxRows,
  placeholder,
  fontSize,
}) {
  const theme = useTheme()

  const handleChange = (event) => onChange(event.target.value)

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      multiline={multiline}
      maxRows={maxRows}
      disableUnderline
      maxLength={50}
      fullWidth
      sx={{
        fontSize: { fontSize },
        color: theme.textSecondary,
      }}
    />
  )
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
}

TextInput.defaultProps = {
  value: "",
  multiline: true,
  maxRows: 1,
  placeholder: "",
  fontSize: "12px",
}

export default TextInput
