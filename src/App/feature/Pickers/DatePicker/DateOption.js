/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { format } from "date-fns"
import SingleItem from "../../../components/SingleItem/SingleItem"

const Value = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.textTertiary};
`

function DateOption({ onClick, icon, title, value }) {
  return (
    <SingleItem
      onClick={onClick}
      icon={icon}
      name={title}
      rightComponent={<Value>{value ? format(value, "iii d MMM") : ""}</Value>}
    />
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
