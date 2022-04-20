/* eslint-disable react/self-closing-comp */
import React from "react"
import styled from "styled-components"
import HamburgerMenu from "./HamburgerMenu"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  width: 100vw;
  height: 48px;
  background-color: ${(props) => props.theme.secondary};
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 0 32px;

  @media (max-width: 440px) {
    padding: 0 12px;
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
          <HamburgerMenu />
        </LeftMenu>
        <RightMenu></RightMenu>
      </Container>
    </Wrapper>
  )
}

export default TopBar
