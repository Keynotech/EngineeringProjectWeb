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

function SignUpForm() {
  const navigate = useNavigate()
  return (
    <FormContainer>
      <FormHeader title="Sign up">
        <SubHeader>
          {"Already have an account? "}
          <button type="button" onClick={() => navigate("/auth/login")}>
            {" "}
            Sign in
          </button>
        </SubHeader>
      </FormHeader>
      <FormSocialAuth />
      <FormSignInput
        submitText="Sign up with email"
        onSubmit={() => console.log("sign up")}
      />
    </FormContainer>
  )
}

export default SignUpForm
