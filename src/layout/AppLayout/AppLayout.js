import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TopBar from "../../navigation/TopBar/TopBar"
import Sidebar from "../../navigation/Sidebar/Sidebar"
import { hideSidebar, showSidebar } from "../../store/features/layoutSlice"
import TagInput from "../../feature/Tag/TagInput/TagInput"

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Main = styled.main`
  flex: 1;
  margin-left: 0px;
  transition: margin-left 0.25s cubic-bezier(0.42, 0, 1, 1);
  height: 100%;

  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      margin-left: 250px;
    `}
`

function AppLayout() {
  const [width, setWidth] = useState(window.innerWidth)
  const sidebarVisibility = useSelector(
    (state) => state.layout.sidebarVisibility
  )
  const tagInputVisibility = useSelector(
    (state) => state.layout.tagInputVisibility
  )
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())
  const _showSidebar = () => dispatch(showSidebar())

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  useEffect(() => {
    if (width < 768) {
      _hideSidebar()
    }
  }, [width < 768])

  useEffect(() => {
    if (width > 768) {
      _showSidebar()
    }
  }, [width > 768])

  return (
    <>
      <Wrapper>
        <TopBar />
        <Container>
          <Sidebar />
          <Main sidebarVisibility={sidebarVisibility}>
            <Outlet />
          </Main>
        </Container>
      </Wrapper>
      {tagInputVisibility ? <TagInput /> : null}
    </>
  )
}

export default AppLayout
