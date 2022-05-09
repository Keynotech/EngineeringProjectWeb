/* eslint-disable react/self-closing-comp */
import React from "react"
import styled from "styled-components"
import SidebarToggleBtn from "./SidebarToggleBtn"
import { mq } from "../../utils/mq"
import zIndex from "../../utils/zIndex"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndex.level9};
  width: 100vw;
  height: 48px;
  background-color: ${(props) => props.theme.secondary};
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const Container = styled.div`
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 15px;

  @media ${mq.laptop} {
    padding: 0 30px;
  }
`

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`

function TopBar() {
  return (
    <Wrapper>
      <Container>
        <LeftMenu>
          <SidebarToggleBtn />
        </LeftMenu>
        <RightMenu></RightMenu>
      </Container>
    </Wrapper>
  )
}

export default TopBar
