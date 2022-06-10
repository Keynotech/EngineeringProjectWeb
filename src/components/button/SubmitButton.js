/* eslint-disable react/require-default-props */
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const Button = styled.button`
  padding: 8px 16px;
  border: 1px solid ${(props) => props.theme.brandColor};
  background-color: ${(props) => props.theme.brandColor};
  color: ${(props) => props.theme.background};
  border-radius: 5px;
  transition: background-color 0.4s, border 0.4s;
  font-weight: 600;

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid ${(props) => props.theme.tertiary};
      background-color: ${(props) => props.theme.background};
      color: ${(props) => props.theme.textTertiary};
      cursor: not-allowed;
    `}
`

function SubmitButton({ text, onClick, type, disabled, style }) {
  return (
    <Button style={style} disabled={disabled} type={type} onClick={onClick}>
      {text}
    </Button>
  )
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

SubmitButton.defaultProps = {
  disabled: true,
}

export default SubmitButton
