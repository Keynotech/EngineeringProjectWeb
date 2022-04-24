/* eslint-disable no-unused-vars */
import React from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import { Input } from "@mui/material"

function DescriptionInput({ value, onChange }) {
  const theme = useTheme()

  const handleChange = (event) => onChange(event.target.value)

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder="Description"
      multiline
      maxRows={15}
      disableUnderline
      sx={{
        fontSize: "12px",
        color: theme.textSecondary,
      }}
    />
  )
}

DescriptionInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

DescriptionInput.defaultProps = {
  value: "",
}

export default DescriptionInput
