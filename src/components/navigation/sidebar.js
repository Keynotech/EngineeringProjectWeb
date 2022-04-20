/* eslint-disable react/no-unstable-nested-components */
import React from "react"
import styled, { css } from "styled-components"
import { useSelector } from "react-redux"
import InboxIcon from "@mui/icons-material/Inbox"
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek"
import TodayIcon from "@mui/icons-material/Today"
import NavItem from "./NavItem"

const Wrapper = styled.nav`
  position: fixed;
  overflow-y: auto;
  height: calc(100vh - 56px);
  width: min(300px, 100vw);
  left: -400px;
  background-color: ${(props) => props.theme.primary};
  transition: all 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      left: 0px;
    `}

  &::-webkit-scrollbar {
    display: none;
  }
`

const Container = styled.div`
  width: calc(100% - 40px);
  padding-left: 30px;
  padding-top: 30px;
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
      padding: 8px;
      border-radius: 4px;
      min-height: 24px;
    }
    &:not(:last-child) {
      margin-bottom: 2px;
    }
  }
`

function Sidebar() {
  const sidebarVisibility = useSelector(
    (state) => state.sidebarVisibility.value
  )
  return (
    <Wrapper sidebarVisibility={sidebarVisibility}>
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
  )
}

export default Sidebar
