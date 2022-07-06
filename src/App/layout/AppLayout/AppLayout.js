/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react"
import styled, { css, useTheme } from "styled-components"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import LoadingScreen from "./LoadingScreen"
import Sidebar from "./Sidebar/Sidebar"
import { hideSidebar, showSidebar } from "../../store/features/layoutSlice"
import TagInput from "../../feature/Tag/TagInput/TagInput"
import ProjectInput from "../../feature/Project/ProjectInput/ProjectInput"
import useWindowSize from "../../hooks/useWindowSize"
import { size, mq } from "../../../utils/mq"
import TagEdit from "../../feature/Tag/TagInput/TagEdit"
import ProjectEdit from "../../feature/Project/ProjectInput/ProjectEdit"
import useProjectsQuery from "../../hooks/query/useProjectsQuery"
import useTagsQuery from "../../hooks/query/useTagsQuery"
import FolderInput from "../../feature/Folder/FolderInput/FolderInput"
import useFoldersQuery from "../../hooks/query/useFoldersQuery"
import useTasksQuery from "../../hooks/query/useTasksQuery"
import FolderEdit from "../../feature/Folder/FolderInput/FolderEdit"
import useWindowDragDetect from "../../hooks/useWindowDragDetect"
import QuickFind from "../../feature/QuickFind/QuickFind"
import { useAuthContext } from "../../../context/AuthContextProvider"

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
  position: relative;

  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      @media ${mq.laptop} {
        margin-left: 280px;
      }
    `}
`

function AppLayout() {
  // User
  // ===========================================================================

  // Queries
  // ===========================================================================
  const projects = useProjectsQuery()
  const tags = useTagsQuery()
  const folders = useFoldersQuery()
  const tasks = useTasksQuery()
  const theme = useTheme()
  const navigate = useNavigate()

  // State hooks
  // ===========================================================================
  const windowSize = useWindowSize()
  useWindowDragDetect()

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

  const projectInputVisibility = useSelector(
    (state) => state.layout.projectInputVisibility
  )

  const folderInputVisibility = useSelector(
    (state) => state.layout.folderInputVisibility
  )

  const foldersEditVisibility = useSelector(
    (state) => state.folders.foldersEditVisibility
  )

  const tagEditVisibility = useSelector((state) => state.tagEditPage.visibility)

  const projectEditVisibility = useSelector(
    (state) => state.projectEditPage.visibility
  )

  const quickFindVisibility = useSelector(
    (state) => state.layout.quickFindVisibility
  )

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())
  const _showSidebar = () => dispatch(showSidebar())

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (
      (windowSize.width < size.laptop && taskPageVisibility === true) ||
      windowSize.width < size.laptop
    ) {
      _hideSidebar()
    }
  }, [windowSize.width < size.laptop, taskPageVisibility])

  useEffect(() => {
    if (windowSize.width > size.laptop) {
      _showSidebar()
    }
  }, [windowSize.width > size.laptop])

  return (
    <Wrapper>
      {folders.isSuccess &&
      projects.isSuccess &&
      tags.isSuccess &&
      tasks.isSuccess ? (
        <>
          <Container>
            <Sidebar />
            <Main sidebarVisibility={sidebarVisibility}>
              <Outlet />
            </Main>
          </Container>
          {tagInputVisibility && <TagInput />}
          {tagEditVisibility && <TagEdit />}
          {projectInputVisibility && <ProjectInput />}
          {projectEditVisibility && <ProjectEdit />}
          {folderInputVisibility && <FolderInput />}
          {foldersEditVisibility && <FolderEdit />}
          {quickFindVisibility && <QuickFind />}
        </>
      ) : (
        <LoadingScreen />
      )}
    </Wrapper>
  )
}

export default AppLayout
