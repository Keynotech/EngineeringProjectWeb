/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { useQueryClient } from "react-query"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 4px 8px;
  border-radius: 5px;
  color: ${(props) => props.theme.textTertiary};
  background-color: ${(props) => props.theme.secondary};
`

const Title = styled.span`
  font-weight: 400;
  font-size: 12px;
`

function TaskTag({ tagId }) {
  const queryClient = useQueryClient()
  const tag = queryClient.getQueryData(["tags", tagId])
  return (
    <Wrapper>
      <Title>{tag.tagName}</Title>
    </Wrapper>
  )
}

export default TaskTag
