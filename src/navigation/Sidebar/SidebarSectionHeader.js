/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px 5px 20px;
  width: 100%;
`

const SectionName = styled.span`
  flex: 1;
  font-weight: 700;
  font-size: ${(props) => props.fontSize || "16px"};
`
const RightWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
`

function SidebarSectionHeader({
  name,
  onClick,
  rightComponent: rightComponentProp,
  fontSize,
}) {
  let rightComponent = null
  if (rightComponentProp) {
    rightComponent = <RightWrapper>{rightComponentProp}</RightWrapper>
  }
  return (
    <Wrapper onClick={onClick}>
      <SectionName fontSize={fontSize}>{name}</SectionName>
      {rightComponent}
    </Wrapper>
  )
}

export default SidebarSectionHeader
