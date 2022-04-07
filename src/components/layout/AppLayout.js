import React, { useState } from "react"
import styled, { css } from "styled-components"
import { Outlet } from "react-router-dom"
import TopBar from "../navigation/topbar"
import Sidebar from "../navigation/sidebar"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  display: flex;
  padding: 0px 0px;
  margin-left: 0px;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  @media (max-width: 768px) {
    margin-left: 0px;
  }
  ${({ sidebarShow }) =>
    sidebarShow &&
    css`
      margin-left: 300px;
    `}
`

function AppLayout() {
  const [sidebarShow, setSidebarShow] = useState(true)

  const handleSidebar = () => {
    setSidebarShow(!sidebarShow)
  }

  return (
    <Wrapper>
      <TopBar setSidebarShow={() => handleSidebar()} />
      <Container>
        <Sidebar sidebarShow={sidebarShow} />
        <Main sidebarShow={sidebarShow}>
          <Outlet />
        </Main>
      </Container>
    </Wrapper>
  )
}

export default AppLayout
