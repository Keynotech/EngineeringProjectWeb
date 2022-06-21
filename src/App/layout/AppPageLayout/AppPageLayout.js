import React from "react"
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"
import { AnimatePresence } from "framer-motion"
import NewTaskButton from "../../feature/Task/NewTaskButton/NewTaskButton"
import { mq } from "../../../utils/mq"
import zIndex from "../../../utils/zIndex"

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
  transition: padding 0.2s cubic-bezier(0.42, 0, 1, 1);

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${mq.tablet} {
    min-width: 320px;
    max-width: 100%;
    padding: 0 40px;
  }
`
const OutletContainer = styled.div`
  z-index: ${zIndex.level9};
  position: absolute;
  width: 100vw;

  @media ${mq.tablet} {
    position: relative;
  }

  @media ${mq.laptop} {
    z-index: 0;
  }

  @media ${mq.tablet} {
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
`

const ButtonContainer = styled.div`
  position: fixed;
  bottom: 40px;
  right: 20px;
  width: 40px;
  height: 40px;
  z-index: ${zIndex.level1};

  @media ${mq.tablet} {
    right: 40px;
  }

  ${({ taskPageVisibility }) =>
    taskPageVisibility &&
    css`
      @media ${mq.tablet} {
        right: 420px;
        transition: none;
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

function AppPageLayout({ children }) {
  // Selectors
  // ===========================================================================
  const taskPageVisibility = useSelector(
    (state) => state.layout.taskPageVisibility
  )

  return (
    <AnimatePresence>
      <Wrapper>
        <ChildContainer taskPageVisibility={taskPageVisibility}>
          {children}
        </ChildContainer>
        {taskPageVisibility && (
          <OutletContainer>
            <Outlet />
          </OutletContainer>
        )}
        <ButtonContainer taskPageVisibility={taskPageVisibility}>
          <NewTaskButton />
        </ButtonContainer>
      </Wrapper>
    </AnimatePresence>
  )
}

AppPageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default AppPageLayout
