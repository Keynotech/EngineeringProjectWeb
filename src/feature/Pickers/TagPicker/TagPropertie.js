/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.textTertiary};
`
const Value = styled.span`
  font-size: 12px;
  font-weight: 500;
`

function TagPropertie({
  displayValue,
  displayIcon,
  onClick,
  iconSize,
  backgroundColor,
  border,
}) {
  return (
    <Wrapper style={{ backgroundColor, border }} onClick={onClick}>
      {displayIcon ? (
        <LocalOfferIcon sx={{ fontSize: iconSize || "16px" }} color="inherit" />
      ) : null}
      {displayValue ? <Value>Add tag</Value> : null}
    </Wrapper>
  )
}

TagPropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
  iconSize: PropTypes.number,
}

TagPropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default TagPropertie
