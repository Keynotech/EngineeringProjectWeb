/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 0px;
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.color || props.theme.textTertiary};
  cursor: pointer;
`

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  width: 32px;
  font-size: 22px;
`

const Content = styled.div`
  min-width: 0px;
  max-width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const LabelContainer = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.color || props.theme.textTertiary};
`

const ValueContainer = styled.span`
  color: ${(props) => props.color || props.theme.textSecondary};
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function MediumPropertie({
  label: labelProp,
  value: valueProp,
  icon: iconProp,
  color,
  onClick,
}) {
  let label = null
  if (labelProp || valueProp) {
    label = (
      <Content>
        <LabelContainer>{labelProp}</LabelContainer>
        <ValueContainer>{valueProp}</ValueContainer>
      </Content>
    )
  }

  let icon = null
  if (iconProp) {
    icon = <IconContainer>{iconProp}</IconContainer>
  }

  return (
    <Wrapper onClick={onClick} color={color}>
      {icon}
      {label}
    </Wrapper>
  )
}

MediumPropertie.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.node,
  color: PropTypes.string,
}

MediumPropertie.defaultProps = {
  icon: null,
  color: null,
  onClick: null,
  label: null,
}

export default MediumPropertie
