/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 5px;
  color: ${(props) => props.theme.textTertiary};
  background-color: ${(props) => props.theme.tertiary};
`

const Title = styled.span`
  font-weight: 400;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

function TagDisplayInTask({ tagId }) {
  const tag = useSingleTagQuery(tagId)

  return (
    <Wrapper>
      <Title>{tag ? tag.tagName : ""}</Title>
    </Wrapper>
  )
}

export default TagDisplayInTask
