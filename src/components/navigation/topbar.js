import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { toggle } from "../../app/store/features/sidebarSlice"

const Wrapper = styled.div`
  width: 100vw;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(245, 245, 245);
  box-shadow: 0px 1px 10px rgba(196, 196, 196, 0.4);
  border-bottom: 1px solid rgb(0 0 0 / 5%);
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
          <button type="button" onClick={() => dispatch(toggle())}>
            sidebar
          </button>
        </LeftMenu>
        <RightMenu>
          <p>settings, notif, statistics, profile</p>
        </RightMenu>
      </Container>
    </Wrapper>
  )
}

export default TopBar
