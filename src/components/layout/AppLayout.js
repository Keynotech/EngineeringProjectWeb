import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TopBar from "../navigation/topbar"
import Sidebar from "../navigation/sidebar"
import { hideSidebar, showSidebar } from "../../app/store/features/layoutSlice"
import NewTaskButton from "../button/NewTaskButton/NewTaskButton"
import TagInput from "../input/TagInput/TagInput"

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
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 30px;
  padding-right: 30px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin-left: 0px;
    padding-left: 15px;
    padding-right: 15px;
  }

  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      margin-left: 260px;
    `}

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      margin-right: 420px;
    `}
`

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  transition: right 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      right: 420px;
    `}
`

function AppLayout() {
  const [width, setWidth] = useState(window.innerWidth)
  const sidebarVisibility = useSelector(
    (state) => state.layout.sidebarVisibility
  )
  const taskPageVisibility = useSelector(
    (state) => state.layout.taskPageVisibility
  )
  const tagInputVisibility = useSelector(
    (state) => state.layout.tagInputVisibility
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
    <>
      <Wrapper>
        <TopBar />
        <Container>
          <Sidebar />
          <Main
            sidebarVisibility={sidebarVisibility}
            taskPageVisibility={taskPageVisibility}
          >
            <Outlet />
            <ButtonWrapper taskPageVisibility={taskPageVisibility}>
              <NewTaskButton />
            </ButtonWrapper>
          </Main>
        </Container>
      </Wrapper>
      {tagInputVisibility ? <TagInput /> : null}
    </>
  )
}

export default AppLayout
