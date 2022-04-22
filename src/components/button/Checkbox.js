import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const Button = styled.button`
  width: 18px;
  height: 18px;
  margin: 0;
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid ${(props) => props.color};

  ${({ checked }) =>
    checked &&
    css`
      background-color: ${(props) => props.color};
    `}
`

function Checkbox({ checked, onChange, color }) {
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
  color: PropTypes.string,
}

Checkbox.defaultProps = {
  color: "#eeeeee",
}

export default Checkbox
