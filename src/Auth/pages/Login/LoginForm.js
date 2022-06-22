import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
  FormHeader,
  FormContainer,
  FormSocialAuth,
  FormSignInput,
} from "../../features/Form"

const SubHeader = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-size: 16px;

  button {
    color: ${({ theme }) => theme.brandColor};
    font-weight: 600;
    font-size: 16px;

    &:hover {
      opacity: 0.8;
    }
  }
`

function LoginForm() {
  const navigate = useNavigate()
  return (
    <FormContainer>
      <FormHeader title="Sign in">
        <SubHeader>
          {"Don’t have an account? "}
          <button type="button" onClick={() => navigate("/auth/signup")}>
            {" "}
            Sign up
          </button>
        </SubHeader>
      </FormHeader>
      <FormSocialAuth />
      <FormSignInput
        displayPasswordReset
        submitText="Sign in with email"
        onSubmit={() => console.log("sign up")}
      />
    </FormContainer>
  )
}

export default LoginForm
