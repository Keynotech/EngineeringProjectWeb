import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 28px;
  height: 24px;
  margin-right: 5px;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  margin-right: 5px;
  background-color: ${(props) => props.theme.tertiary};
  ${({ color }) =>
    color &&
    css`
      background-color: color;
    `}
`

const Title = styled.span`
  font-weight: 400;
`

function TagItem({ tag }) {
  return (
    <li>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Title>{tag.tagName}</Title>
    </li>
  )
}

TagItem.propTypes = {
  tag: PropTypes.shape({
    tagName: PropTypes.string,
  }).isRequired,
}

export default TagItem
