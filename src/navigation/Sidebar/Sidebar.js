import React from "react"
import styled, { css } from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import CalendarViewWeekOutlinedIcon from "@mui/icons-material/CalendarViewWeekOutlined"
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined"
import AddIcon from "@mui/icons-material/Add"
import SidebarItem from "./SidebarItem"
import { hideSidebar, showTagInput } from "../../store/features/layoutSlice"
import { useTagsQuery } from "../../api/api"
import TagsList from "../../feature/Tag/TagList/TagList"

const Wrapper = styled.nav`
  position: fixed;
  left: -400px;
  z-index: 500;
  height: calc(100vh - 48px);
  width: min(250px, 100vw);
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

const TagsWrapper = styled.div`
  margin-top: 40px;
`

const SectionHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`

const SectionName = styled.span`
  flex: 1;
  font-weight: 600;
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  width: 28px;
  height: 24px;
  margin-right: 5px;
  font-size: 18px;

  color: ${(props) => props.theme.textSecondary};
`

const Backdrop = styled.div`
  visibility: hidden;

  @media (max-width: 768px) {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 499;
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
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTagInput = () => dispatch(showTagInput())

  // Selectors
  // ===========================================================================
  const isVisible = useSelector((state) => state.layout.sidebarVisibility)

  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  return (
    <>
      <Wrapper isVisible={isVisible}>
        <Container>
          <MenuList>
            <SidebarItem
              icon={<InboxOutlinedIcon fontSize="inherit" />}
              name="Inbox"
              route="/inbox"
            />
            <SidebarItem
              icon={<TodayOutlinedIcon fontSize="inherit" />}
              name="Today"
              route="/today"
            />
            <SidebarItem
              route="/week"
              name="Current Week"
              icon={<CalendarViewWeekOutlinedIcon fontSize="inherit" />}
            />
          </MenuList>

          <TagsWrapper>
            <SectionHeader>
              <Icon>
                <LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />
              </Icon>
              <SectionName>Tags</SectionName>
              <AddIcon
                sx={{
                  fontSize: "18px",
                  marginLeft: "-2px",
                  marginRight: "16px",
                }}
                onClick={_showTagInput}
              />
            </SectionHeader>
            {tags.isSuccess ? <TagsList tags={tags} /> : null}
          </TagsWrapper>
        </Container>
      </Wrapper>
      <Backdrop isVisible={isVisible} onClick={() => dispatch(hideSidebar())} />
    </>
  )
}

export default Sidebar
