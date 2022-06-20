/* eslint-disable no-unused-vars */
import React from "react"
import styled, { css, useTheme } from "styled-components"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import PropTypes from "prop-types"
import { useDispatch, useSelector } from "react-redux"
import { toggleSidebar } from "../../../store/features/layoutSlice"
import zIndex from "../../../utils/zIndex"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  gap: 10px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  height: 64px;
  z-index: ${zIndex.level1};
`

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  height: 24px;
  align-items: center;
  min-width: 0px;
  max-width: 100%;
`

const Name = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  color: ${(props) => props.theme.textPrimary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Info = styled.span`
  font-size: 20px;
  line-height: 1.1;
  font-weight: 500;
  padding-left: 14px;
  color: ${(props) => props.theme.textTertiary};
  opacity: 0.8;
  white-space: nowrap;
`

const SidebarToggle = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.25s;
  ${({ isSidebarVisible }) =>
    !isSidebarVisible &&
    css`
      transform: scaleX(-1);
    `}
`

function TaskListHeader({ children, name, additionaInfo }) {
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _toggleSidebar = () => dispatch(toggleSidebar())

  // Selectors
  // ===========================================================================
  const sidebarVisibility = useSelector(
    (state) => state.layout.sidebarVisibility
  )

  // Others
  // ===========================================================================
  const theme = useTheme()

  let childrenElem = null
  if (children) {
    childrenElem = <div>{children}</div>
  }
  return (
    <Wrapper>
      <SidebarToggle
        onClick={_toggleSidebar}
        isSidebarVisible={sidebarVisibility}
      >
        <MenuOpenIcon sx={{ color: theme.textTertiary }} />
      </SidebarToggle>
      <TextContainer>
        <Name>{name}</Name>
        {additionaInfo ? <Info>{additionaInfo}</Info> : null}
      </TextContainer>
      {childrenElem}
    </Wrapper>
  )
}

TaskListHeader.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  additionaInfo: PropTypes.string,
}

TaskListHeader.defaultProps = {
  children: null,
  additionaInfo: null,
}

export default TaskListHeader

/* <button type="button" onClick={() => dispatch(toggleDisplayDetails())}>
        {isDetailDisplay ? "Hide details" : "Show details"}
      </button> */
