/* eslint-disable react/require-default-props */
import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const Button = styled.button`
  padding: 4px 10px;
  border: 1px solid ${(props) => props.theme.brandColor};
  background-color: ${(props) => props.theme.brandColor};
  color: ${(props) => props.theme.background};
  border-radius: 5px;
  transition: background-color 0.4s, border 0.4s;

  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid ${(props) => props.theme.tertiary};
      background-color: ${(props) => props.theme.background};
      color: ${(props) => props.theme.textTertiary};
      cursor: not-allowed;
    `}
`

function SubmitButton({ text, onClick, type, disabled }) {
  return (
    <Button disabled={disabled} type={type} onClick={onClick}>
      {text}
    </Button>
  )
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

SubmitButton.defaultProps = {
  disabled: true,
}

export default SubmitButton
