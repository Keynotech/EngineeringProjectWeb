import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import NewTaskButton from "../../feature/Task/NewTaskButton/NewTaskButton"
import { mq } from "../../utils/mq"
import zIndex from "../../utils/zIndex"

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const ChildContainer = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 0 12px;
  transition: padding 0.25s cubic-bezier(0.42, 0, 1, 1);

  @media ${mq.tablet} {
    padding: 0 28px;
  }
`
const OutletContainer = styled.div`
  z-index: ${zIndex.level2};
  width: 0;

  @media ${mq.tablet} {
    will-change: width;
    transition: width 0.25s cubic-bezier(0.42, 0, 1, 1);
  }

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      width: 100vw;
      position: absolute;

      @media ${mq.tablet} {
        position: relative;
        width: 400px;
      }

      @media ${mq.desktop} {
        width: 450px;
      }

      @media ${mq.desktopL} {
        width: 600px;
      }

      @media ${mq.desktopXL} {
        width: 800px;
      }
    `}
`

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: ${zIndex.level1};
  will-change: right;
  transition: right 0.25s cubic-bezier(0.42, 0, 1, 1);

  @media ${mq.tablet} {
    right: 40px;
  }

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      @media ${mq.tablet} {
        right: 420px;
      }

      @media ${mq.desktop} {
        right: 470px;
      }

      @media ${mq.desktopL} {
        right: 620px;
      }

      @media ${mq.desktopXL} {
        right: 820px;
      }
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
