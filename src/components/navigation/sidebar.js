import React from "react"
import styled, { css } from "styled-components"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Wrapper = styled.nav`
  position: fixed;
  width: 300px;
  left: -400px;
  height: calc(100vh - 56px);
  background-color: rgb(245, 245, 245);
  transition: left 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ sidebarVisibility }) =>
    sidebarVisibility &&
    css`
      left: 0px;
    `}
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 30px;
  padding-top: 30px;
`

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
`

function Sidebar() {
  const sidebarVisibility = useSelector(
    (state) => state.sidebarVisibility.value
  )
  return (
    <Wrapper sidebarVisibility={sidebarVisibility}>
      <Container>
        <MenuList>
          <Link to="/inbox">Inbox</Link>
          <Link to="/today">Today</Link>
        </MenuList>
      </Container>
    </Wrapper>
  )
}

export default Sidebar
