import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TopBar from "../navigation/topbar"
import Sidebar from "../navigation/sidebar"
import { hideSidebar, showSidebar } from "../../app/store/features/sidebarSlice"

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
  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      margin-left: 300px;
    `}
`

function AppLayout() {
  const [width, setWidth] = useState(window.innerWidth)
  const sidebarVisibility = useSelector(
    (state) => state.sidebarVisibility.value
  )
  const dispatch = useDispatch()

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  useEffect(() => {
    if (width < 768) {
      dispatch(hideSidebar())
    }
  }, [width < 768])

  useEffect(() => {
    if (width > 768) {
      dispatch(showSidebar())
    }
  }, [width > 768])

  return (
    <Wrapper>
      <TopBar />
      <Container>
        <Sidebar />
        <Main sidebarVisibility={sidebarVisibility}>
          <Outlet />
        </Main>
      </Container>
    </Wrapper>
  )
}

export default AppLayout
