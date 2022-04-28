import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Button = styled.button`
  padding: 4px 10px;
  border: 1px solid ${(props) => props.theme.tertiary};
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.textTertiary};
  border-radius: 5px;
`

function CancelButton({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>
}

CancelButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CancelButton
