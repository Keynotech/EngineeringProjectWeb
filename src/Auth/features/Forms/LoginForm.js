import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import {
  FormHeader,
  FormContainer,
  FormSocialAuth,
  FormEmailPassword,
} from "../../components/Form"
import { useAuthContext } from "../../../context/AuthContextProvider"

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
  const { loginWithEmail } = useAuthContext()

  const onSubmit = ({ email, password }) => {
    loginWithEmail(email, password).catch((error) => {
      const { code, message } = error
      console.log(code, message)
    })
  }
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
      <FormEmailPassword
        displayPasswordReset
        submitText="Sign in with email"
        onSubmit={onSubmit}
      />
    </FormContainer>
  )
}

export default LoginForm
