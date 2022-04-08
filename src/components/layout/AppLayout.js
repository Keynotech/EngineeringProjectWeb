import React, { useState, useEffect } from "react"
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
  background-color: aliceblue;

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
  const [width, setWidth] = useState(window.innerWidth)

  const handleSidebar = (value) => {
    setSidebarShow(value)
  }

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  useEffect(() => {
    if (width < 768) {
      handleSidebar(false)
    }
  }, [width < 768])

  useEffect(() => {
    if (width > 768) {
      handleSidebar(true)
    }
  }, [width > 768])

  return (
    <Wrapper>
      <TopBar setSidebarShow={() => handleSidebar(!sidebarShow)} />
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
