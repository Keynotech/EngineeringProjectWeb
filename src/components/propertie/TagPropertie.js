/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import styled from "styled-components"
import { mq } from "../../utils/mq"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.tertiary};
  color: ${(props) => props.theme.textTertiary};

  @media ${mq.desktopL} {
    padding: 4px 14px;
  }
`
export const Value = styled.span`
  font-size: 12px;

  @media ${mq.desktopL} {
    font-size: 14px;
  }
`

function TagPropertie({ displayValue, displayIcon, onClick, iconSize }) {
  return (
    <Wrapper onClick={onClick}>
      {displayIcon ? (
        <LocalOfferIcon fontSize={iconSize || "inherit"} color="inherit" />
      ) : null}
      {displayValue ? <Value>Add tag</Value> : null}
    </Wrapper>
  )
}

TagPropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
  iconSize: PropTypes.string,
}

TagPropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default TagPropertie
