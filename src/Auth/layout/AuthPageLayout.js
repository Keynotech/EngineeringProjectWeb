/* eslint-disable react/prop-types */
import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

function AuthPageLayout({ children, user }) {
  if (user) {
    const navigate = useNavigate()
    navigate("/app")
  }
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}

export default AuthPageLayout
