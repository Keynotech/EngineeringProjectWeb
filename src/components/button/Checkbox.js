/* eslint-disable react/require-default-props */
import React from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import { Checkbox as CheckboxNextUI } from "@nextui-org/react"

function Checkbox({ checked, onChange, color }) {
  const theme = useTheme()

  return (
    <CheckboxNextUI
      aria-label="checkbox"
      type="checkbox"
      value={checked}
      onChange={() => {
        onChange()
      }}
      color={color || theme.priority1}
    />
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default Checkbox
