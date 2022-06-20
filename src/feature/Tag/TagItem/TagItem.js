/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  min-width: 0px;
  max-width: 100%;
`

const IconWrapper = styled.div`
  display: flex;
  height: 22px;
  min-width: 42px;
  align-items: center;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
`

const Title = styled.span`
  flex: 1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

function TagItem({ tag }) {
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
