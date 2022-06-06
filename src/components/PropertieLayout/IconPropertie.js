/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.color || props.theme.textTertiary};
  font-size: 20px;
`

function IconPropertie({ icon, color, onClick }) {
  return (
    <Wrapper onClick={onClick} color={color}>
      {icon}
    </Wrapper>
  )
}

IconPropertie.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.node.isRequired,
  color: PropTypes.string,
}

IconPropertie.defaultProps = {
  color: null,
  onClick: null,
}

export default IconPropertie
