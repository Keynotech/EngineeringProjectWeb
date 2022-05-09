/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${(props) => props.theme.textSecondary};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  max-height: 24px;
  margin-right: 12px;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
  ${({ color }) =>
    color &&
    css`
      background-color: color;
    `}
`

const Title = styled.span`
  flex: 1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function TagItem({ tagId }) {
  const tag = useSingleTagQuery(tagId)
  return (
    <Wrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Title>{tag ? tag.tagName : ""}</Title>
    </Wrapper>
  )
}

export default TagItem
