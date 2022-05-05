import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import NewTaskButton from "../../feature/Task/NewTaskButton/NewTaskButton"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const ChildContainer = styled.div`
  flex: 1;
  padding-left: 30px;
  padding-right: 30px;
  height: 100%;
  overflow-y: auto;
`
const OutletContainer = styled.div`
  width: 0;
  will-change: width;
  transition: width 0.2s cubic-bezier(0.42, 0, 1, 1);

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      width: min(420px, 100vw);
    `}
`

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  will-change: right;
  transition: right 0.2s cubic-bezier(0.42, 0, 1, 1);

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      right: min(420px, 100vw);
    `}
`

function MainLayout({ children }) {
  // Selectors
  // ===========================================================================
  const taskPageVisibility = useSelector(
    (state) => state.layout.taskPageVisibility
  )
  return (
    <Wrapper>
      <ChildContainer taskPageVisibility={taskPageVisibility}>
        {children}
      </ChildContainer>
      <OutletContainer taskPageVisibility={taskPageVisibility}>
        <Outlet />
      </OutletContainer>
      <ButtonContainer taskPageVisibility={taskPageVisibility}>
        <NewTaskButton />
      </ButtonContainer>
    </Wrapper>
  )
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default MainLayout
