import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Button = styled.button`
  padding: 4px 10px;
  border: 1px solid ${(props) => props.theme.brandColor};
  background-color: ${(props) => props.theme.brandColor};
  color: ${(props) => props.theme.background};
  border-radius: 5px;
`

function SubmitButton({ text, onClick }) {
  return <Button onClick={onClick}>{text}</Button>
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SubmitButton
