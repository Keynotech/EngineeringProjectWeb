import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Text = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textError};
`

function TextError({ value }) {
  return <Text>{value}</Text>
}

TextError.propTypes = {
  value: PropTypes.string.isRequired,
}
export default TextError
