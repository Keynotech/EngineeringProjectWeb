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
  font-size: 18px;
`

const Value = styled.span`
  font-size: 12px;
  font-weight: 500;
`

function StandardPropertie({
  value: valueProp,
  icon: iconProp,
  color,
  onClick,
  backgroundColor,
  displayIcon,
}) {
  let value = null
  if (valueProp) {
    value = <Value>{valueProp}</Value>
  }

  let icon = null
  if (iconProp && displayIcon) {
    icon = iconProp
  }

  return (
    <Wrapper style={{ backgroundColor }} onClick={onClick} color={color}>
      {icon}
      {value}
    </Wrapper>
  )
}

StandardPropertie.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
  backgroundColor: PropTypes.string,
  displayIcon: PropTypes.bool,
}

StandardPropertie.defaultProps = {
  icon: null,
  color: null,
  onClick: null,
  value: null,
  backgroundColor: null,
  displayIcon: true,
}

export default StandardPropertie
