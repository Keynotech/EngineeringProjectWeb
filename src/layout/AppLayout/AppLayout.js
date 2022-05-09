import React, { useEffect } from "react"
import styled, { css } from "styled-components"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TopBar from "../../navigation/TopBar/TopBar"
import Sidebar from "../../navigation/Sidebar/Sidebar"
import { hideSidebar, showSidebar } from "../../store/features/layoutSlice"
import TagInput from "../../feature/Tag/TagInput/TagInput"
import useWindowSize from "../../hooks/useWindowSize"
import { size, mq } from "../../utils/mq"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
      @media ${mq.laptop} {
        margin-left: 300px;
      }
    `}
`

function AppLayout() {
  // State hooks
  // ===========================================================================
  const windowSize = useWindowSize()

  // Selectors
  // ===========================================================================
  const sidebarVisibility = useSelector(
    (state) => state.layout.sidebarVisibility
  )
  const tagInputVisibility = useSelector(
    (state) => state.layout.tagInputVisibility
  )

  const taskPageVisibility = useSelector(
    (state) => state.layout.taskPageVisibility
  )

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())
  const _showSidebar = () => dispatch(showSidebar())

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (windowSize.width < size.laptop) {
      _hideSidebar()
    } else if (windowSize.width > size.laptop) {
      _showSidebar()
    }
  }, [windowSize.width])

  useEffect(() => {
    if (windowSize.width < size.laptop && taskPageVisibility === true) {
      console.log("True")
      _hideSidebar()
    }
  }, [windowSize.width, taskPageVisibility])

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
