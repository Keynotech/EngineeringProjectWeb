/* eslint-disable react/prop-types */
import React from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  flex: 1;
  max-height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

function AuthPageLayout() {
  /*
  if (user) {
    const navigate = useNavigate()
    navigate("/app")
  }
  */
  return (
    <Wrapper>
      <Container>
        <Outlet />
      </Container>
    </Wrapper>
  )
}

export default AuthPageLayout

/*


const Wrapper = styled.div`
  display: flex;
  max-height: 100%;
  overflow-x: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

const Container = styled.div`
  flex: 1;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

*/
