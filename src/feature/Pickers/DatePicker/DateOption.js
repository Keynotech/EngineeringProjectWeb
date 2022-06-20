/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  padding: 10px 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
`

const Title = styled.div`
  flex: 1;
  text-align: left;
`

const Value = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textTertiary};
`

function DateOption({ onClick, icon, title, value }) {
  return (
    <Wrapper onClick={onClick}>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value ? format(value, "iii d MMM") : ""}</Value>
    </Wrapper>
  )
}

export default DateOption

DateOption.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string,
  value: PropTypes.instanceOf(Date),
}

DateOption.defaultProps = {
  title: "",
  value: "",
}
