/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import { useQueryClient } from "react-query"

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 4px;
  min-height: 24px;
  color: ${(props) => props.theme.textSecondary};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  height: 24px;
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
  font-weight: 400;
`

function TagItem({ tagId }) {
  const queryClient = useQueryClient()
  const tag = queryClient.getQueryData(["tags", tagId])
  return (
    <Wrapper>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Title>{tag.tagName}</Title>
    </Wrapper>
  )
}

export default TagItem
