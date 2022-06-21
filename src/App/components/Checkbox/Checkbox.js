/* eslint-disable react/require-default-props */
import React from "react"
import PropTypes from "prop-types"
import styled, { css, useTheme } from "styled-components"
import CheckIcon from "@mui/icons-material/Check"

const Button = styled.button`
  width: 18px;
  height: 18px;
  margin: 0;
  background-color: ${(props) => props.theme.background};
  border-radius: 5px;
  border: 2px solid ${(props) => props.color};
  ${({ checked }) =>
    checked &&
    css`
      background-color: ${(props) => props.color};
    `}
`

function Checkbox({ checked, onChange, color }) {
  const theme = useTheme()

  return (
    <Button
      type="checkbox"
      checked={checked}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChange()
      }}
      color={color || theme.priority1}
    >
      {checked ? (
        <CheckIcon sx={{ fontSize: "14px", color: theme.primary }} />
      ) : null}
    </Button>
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default Checkbox

/*

import React from "react"
import PropTypes from "prop-types"
import { useTheme } from "styled-components"
import { Checkbox as CheckbouxMUI } from "@mui/material"

function Checkbox({ checked, onChange, color }) {
  const theme = useTheme()

  return (
    <CheckbouxMUI
      type="checkbox"
      checked={checked}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        onChange()
      }}
      sx={{
        color: color || theme.priority1,
        "&.MuiCheckbox-root": {
          color: color || theme.priority1,
             height: "20px",
    boxSizing: "border-box" /
          "&:hover": {
            backgroundColor: "transparent !important",
          },
        },
      }}
    />
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default Checkbox

*/

/*



import React from "react"
import PropTypes from "prop-types"
import styled, { css, useTheme } from "styled-components"

const Button = styled.button`
  width: 18px;
  height: 18px;
  margin: 0;
  background-color: ${(props) => props.theme.background};
  border-radius: 5px;
  border: 2px solid ${(props) => props.color};
  ${({ checked }) =>
    checked &&
    css`
      background-color: ${(props) => props.color};
    `}
`

function Checkbox({ checked, onChange, color }) {
  const theme = useTheme()

  return (
    <Button
      type="checkbox"
      checked={checked}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
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

*/
