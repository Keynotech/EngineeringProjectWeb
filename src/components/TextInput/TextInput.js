/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import { Input } from "@mui/material"

function TextInput({
  value,
  onChange,
  onFocus,
  onBlur,
  multiline,
  maxRows,
  placeholder,
  fontSize,
  fontWeight,
  autoFocus,
  id,
  name,
  maxLength,
  type,
}) {
  const theme = useTheme()

  const handleChange = (event) => onChange(event.target.value)

  return (
    <Input
      type={type}
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
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      sx={{
        padding: 0,
        margin: 0,
        fontSize: { fontSize },
        color: theme.textSecondary,
        background: theme.background,
        fontWeight,
        resize: "none",
        "& 	.MuiInput-input	": {
          padding: 0,
        },
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
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  multiline: PropTypes.bool,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  maxLength: PropTypes.number,
  type: PropTypes.string,
}

TextInput.defaultProps = {
  value: "",
  multiline: true,
  maxRows: 1,
  placeholder: "",
  fontSize: "12px",
  fontWeight: 400,
  autoFocus: false,
  type: "text",
}

export default TextInput
