/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

const Wrapper = styled.nav`
  position: fixed;
  width: 300px;
  left: -400px;
  height: calc(100vh - 56px);
  background-color: rgb(245, 245, 245);
  transition: left 0.25s cubic-bezier(0.42, 0, 1, 1);

  @media (max-width: 768px) {
    left: -400px;
  }
  ${({ sidebarShow }) =>
    sidebarShow &&
    css`
      left: 0px;
    `}
`

function Sidebar(props) {
  const { sidebarShow } = props
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

  return (
    <Wrapper sidebarShow={sidebarShow}>
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
