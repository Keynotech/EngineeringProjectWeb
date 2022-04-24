import React from "react"
import styled, { css } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import NavItem from "./NavItem"
import { hideSidebar } from "../../app/store/features/layoutSlice"

const Wrapper = styled.nav`
  position: fixed;
  left: -400px;
  z-index: 999;
  height: calc(100vh - 48px);
  width: min(260px, 100vw);
  overflow-y: auto;
  background-color: ${(props) => props.theme.background};
  border-right: 1px solid ${(props) => props.theme.secondary};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ isVisible }) =>
    isVisible &&
    css`
      left: 0px;
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  width: calc(100% - 40px);
  padding-top: 15px;
  padding-left: 30px;
  padding-bottom: 30px;
`

const MenuList = styled.ul`
  li {
    a {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 5px;
      border-radius: 4px;
      min-height: 24px;
    }
    &:not(:last-child) {
      margin-bottom: 2px;
    }
  }
`

const Backdrop = styled.div`
  visibility: hidden;

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.2s cubic-bezier(0.42, 0, 1, 1);
    opacity: 0;
    visibility: hidden;

    ${({ isVisible }) =>
      isVisible &&
      css`
        opacity: 1;
        visibility: visible;
      `}
  }
`

function Sidebar() {
  const dispatch = useDispatch()
  const isVisible = useSelector((state) => state.layout.sidebarVisibility)
  return (
    <>
      <Wrapper isVisible={isVisible}>
        <Container>
          <MenuList>
            <NavItem
              icon={<InboxOutlinedIcon fontSize="inherit" />}
              name="Inbox"
              route="/inbox"
            />
            <NavItem
              icon={<TodayOutlinedIcon fontSize="inherit" />}
              name="Today"
              route="/today"
            />
            <NavItem
              route="/week"
              name="Current Week"
              icon={<CalendarViewWeekOutlinedIcon fontSize="inherit" />}
            />
          </MenuList>
        </Container>
      </Wrapper>
      <Backdrop isVisible={isVisible} onClick={() => dispatch(hideSidebar())} />
    </>
  )
}

export default Sidebar
