import React from "react"
import styled, { css } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined"
import SearchIcon from "@mui/icons-material/Search"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import SidebarLink from "./SidebarLink"
import { hideSidebar } from "../../store/features/layoutSlice"
import { mq } from "../../utils/mq"
import zIndex from "../../utils/zIndex"
import SidebarList from "./SidebarList"
import SidebarTagList from "./SidebarTagList"
import SidebarSectionHeader from "./SidebarSectionHeader"

const Wrapper = styled.nav`
  position: absolute;
  width: 100vw;
  left: -100vw;
  height: 100vh;
  overflow-y: auto;
  z-index: ${zIndex.level9};
  background-color: ${(props) => props.theme.background};
  border-right: 1px solid ${(props) => props.theme.tertiary};
  transition: left 0.25s cubic-bezier(0.42, 0, 1, 1);
  will-change: left;

  @media ${mq.phone} {
    position: fixed;
    left: -300px;
    width: 300px;
  }

  ${({ isVisible }) =>
    isVisible &&
    css`
      left: 0px;

      @media ${mq.phone} {
        left: 0px;
      }
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  width: 100%;
  padding-top: 5px;
  padding-bottom: 30px;
`

const Backdrop = styled.div`
  display: none;

  @media ${mq.phone} {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: ${zIndex.level8};
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);
    opacity: 0;
    visibility: hidden;

    ${({ isVisible }) =>
      isVisible &&
      css`
        opacity: 1;
        visibility: visible;
      `}
  }
  @media ${mq.laptop} {
    display: none;
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
  margin-bottom: 10px;
`

const SearchButton = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
`

function Sidebar() {
  // State Hooks
  // ===========================================================================

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())

  // Selectors
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.sidebarVisibility)

  return (
    <>
      <Wrapper isVisible={isVisible}>
        <Container>
          <Header>
            <SidebarSectionHeader
              fontSize="16px"
              name="Hi, {user.nickname}"
              rightComponent={
                <SearchButton>
                  <SearchIcon />
                </SearchButton>
              }
            />
          </Header>
          <SidebarList>
            <SidebarLink
              icon={<InboxOutlinedIcon fontSize="inherit" />}
              name="Inbox"
              route="/inbox"
            />
            <SidebarLink
              icon={<TodayOutlinedIcon fontSize="inherit" />}
              name="Today"
              route="/today"
            />
            <SidebarLink
              route="/week"
              name="Current Week"
              icon={<CalendarViewWeekOutlinedIcon fontSize="inherit" />}
            />
          </SidebarList>

          <SidebarTagList />
        </Container>
      </Wrapper>
      <Backdrop isVisible={isVisible} onClick={_hideSidebar} />
    </>
  )
}

export default Sidebar
