import React from "react"
import styled from "styled-components"
import GoogleAuthButton from "../Buttons/GoogleAuthBtn"
import AppleAuthButton from "../Buttons/AppleAuthBtn"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

function FormSocialAuth() {
  return (
    <Wrapper>
      <GoogleAuthButton onClick={() => console.log("google")} />
      <AppleAuthButton onClick={() => console.log("apple")} />
    </Wrapper>
  )
}

export default FormSocialAuth
