/* eslint-disable react/require-default-props */
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
  fontWeight,
  autoFocus,
  id,
  name,
  maxLength,
}) {
  const theme = useTheme()

  const handleChange = (event) => onChange(event.target.value)

  return (
    <Input
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      multiline={multiline}
      maxRows={maxRows}
      inputProps={{
        maxLength,
      }}
      disableUnderline
      fullWidth
      autoFocus={autoFocus}
      sx={{
        padding: 0,
        margin: 0,
        fontSize: { fontSize },
        color: theme.textSecondary,
        fontWeight,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Apple Color Emoji,Helvetica,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol;",
      }}
    />
  )
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  maxLength: PropTypes.number,
}

TextInput.defaultProps = {
  value: "",
  multiline: true,
  maxRows: 1,
  placeholder: "",
  fontSize: "12px",
  fontWeight: 400,
  autoFocus: false,
}

export default TextInput
