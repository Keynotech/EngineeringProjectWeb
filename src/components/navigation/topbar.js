/* eslint-disable react/self-closing-comp */
import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { toggleSidebar } from "../../app/store/features/sidebarSlice"
import { toggleDarkMode } from "../../app/store/features/themeSlice"

const Wrapper = styled.div`
  width: 100vw;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.brandColor};
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
`

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
`

const RightMenu = styled.div`
  display: flex;
  align-items: center;
`

function TopBar() {
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <Container>
        <LeftMenu>
          <button type="button" onClick={() => dispatch(toggleSidebar())}>
            s
          </button>
          <button
            style={{ marginLeft: "5px" }}
            type="button"
            onClick={() => dispatch(toggleDarkMode())}
          >
            d
          </button>
        </LeftMenu>
        <RightMenu></RightMenu>
      </Container>
    </Wrapper>
  )
}

export default TopBar
