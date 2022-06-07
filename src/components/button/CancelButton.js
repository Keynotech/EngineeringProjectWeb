/* eslint-disable react/require-default-props */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Button = styled.button`
  padding: 6px 12px;
  border: 1px solid ${(props) => props.theme.tertiary};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textTertiary};
  border-radius: 5px;
`

function CancelButton({ text, onClick, type, style }) {
  return (
    <Button style={style} type={type} onClick={onClick}>
      {text}
    </Button>
  )
}

CancelButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

export default CancelButton
