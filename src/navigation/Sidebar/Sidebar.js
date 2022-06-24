import React from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import SearchIcon from "@mui/icons-material/Search"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import { LayoutGroup } from "framer-motion"
import SidebarLink from "./SidebarLink"
import { hideSidebar, showQuickFind } from "../../store/features/layoutSlice"
import { mq } from "../../utils/mq"
import zIndex from "../../utils/zIndex"
import SidebarList from "./SidebarList"
import SidebarProjectList from "./SidebarProjectList/SidebarProjectList"
import SidebarTagList from "./SidebarTagList/SidebarTagList"
import SidebarHeader from "./SidebarHeader/SidebarHeader"
import SidebarItem from "./SidebarItem"

const Wrapper = styled.nav`
  position: absolute;
  width: 100vw;
  left: -100vw;
  height: 100vh;
  overflow-y: auto;
  z-index: ${zIndex.level3};
  background-color: ${(props) => props.theme.primary};
  border-right: 1px solid ${(props) => props.theme.tertiary};
  transition: left 0.25s cubic-bezier(0.42, 0, 1, 1);
  will-change: left;

  @media ${mq.phone} {
    position: fixed;
    left: -300px;
    width: 280px;
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
  padding-top: 10px;
  padding-bottom: 30px;
`

const Backdrop = styled.div`
  display: none;

  @media ${mq.phone} {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: ${zIndex.level2};
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

function Sidebar() {
  // Others
  // ===========================================================================
  const { t } = useTranslation()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideSidebar = () => dispatch(hideSidebar())
  const _showQuickFind = () => dispatch(showQuickFind())

  // Selectors
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.sidebarVisibility)

  return (
    <>
      <Wrapper isVisible={isVisible}>
        <Container>
          <SidebarHeader />
          <SidebarList>
            <SidebarItem
              icon={<SearchIcon fontSize="inehrit" />}
              name={t("sidebar.quickFind")}
              onClick={_showQuickFind}
              clickable
            />
            <SidebarLink
              icon={<InboxOutlinedIcon fontSize="inherit" />}
              name={t("sidebar.inbox")}
              route="/inbox"
            />
            <SidebarLink
              icon={<TodayOutlinedIcon fontSize="inherit" />}
              name={t("sidebar.today")}
              route="/today"
            />
            <SidebarLink
              route="/upcoming"
              name={t("sidebar.upcoming")}
              icon={<CalendarViewWeekOutlinedIcon fontSize="inherit" />}
            />
          </SidebarList>
          <LayoutGroup>
            <SidebarProjectList />
            <SidebarTagList />
          </LayoutGroup>
        </Container>
      </Wrapper>
      <Backdrop isVisible={isVisible} onClick={_hideSidebar} />
    </>
  )
}

export default Sidebar
