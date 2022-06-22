import React from "react"
import styled from "styled-components"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import SocialAuthButton from "../../components/SocialAuthButton"

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
      <SocialAuthButton
        icon={<GoogleIcon color="inherit" />}
        text="Continue with Google"
      />
      <SocialAuthButton
        icon={<AppleIcon color="inherit" />}
        text="Continue with Apple"
      />
    </Wrapper>
  )
}

export default FormSocialAuth
