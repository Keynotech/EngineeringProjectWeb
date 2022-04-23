import React from "react"
import styled, { css } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import InboxIcon from "@mui/icons-material/Inbox"
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek"
import TodayIcon from "@mui/icons-material/Today"
import NavItem from "./NavItem"
import { hideSidebar } from "../../app/store/features/layoutSlice"

const Wrapper = styled.nav`
  position: fixed;
  left: -400px;
  z-index: 999;
  height: calc(100vh - 48px);
  width: min(300px, 100vw);
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
  padding-top: 30px;
  padding-left: 30px;
  padding-bottom: 30px;

  @media (max-width: 440px) {
    padding-left: 10px;
    width: calc(100% - 20px);
  }
`

const MenuList = styled.ul`
  li {
    a {
      display: flex;
      align-items: center;
      flex-direction: row;
      padding: 8px 5px;
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
              icon={<InboxIcon fontSize="inherit" />}
              name="Inbox"
              route="/inbox"
            />
            <NavItem
              icon={<TodayIcon fontSize="inherit" />}
              name="Today"
              route="/today"
            />
            <NavItem
              route="/week"
              name="Current Week"
              icon={<CalendarViewWeekIcon fontSize="inherit" />}
            />
          </MenuList>
        </Container>
      </Wrapper>
      <Backdrop isVisible={isVisible} onClick={() => dispatch(hideSidebar())} />
    </>
  )
}

export default Sidebar
