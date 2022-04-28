import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled, { css, useTheme } from "styled-components"

const Button = styled.button`
  width: 16px;
  height: 16px;
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

function Checkbox({ checked, onChange, priority }) {
  const [color, setColor] = useState()
  const theme = useTheme()

  useEffect(() => {
    switch (priority) {
      case 1:
        setColor(theme.priority1)
        break
      case 2:
        setColor(theme.priority2)
        break
      case 3:
        setColor(theme.priority3)
        break
      case 4:
        setColor(theme.priority4)
        break
      case undefined:
        setColor(theme.priority1)
        break
      default:
        setColor(theme.priority1)
        break
    }
  }, [priority])

  return (
    <Button
      type="checkbox"
      checked={checked}
      onClick={onChange}
      color={color}
    />
  )
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  priority: PropTypes.number,
}

Checkbox.defaultProps = {
  priority: 1,
}

export default Checkbox
