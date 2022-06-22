import React from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { FormHeader, FormContainer } from "../../features/Form"
import EmailInput from "../../features/Input/EmailInput"
import SubmitButton from "../../../components/button/SubmitButton"

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

function PasswordResetForm() {
  const navigate = useNavigate()

  return (
    <FormContainer>
      <FormHeader title="Reset password">
        <SubHeader>
          {"Just remembered? "}
          <button type="button" onClick={() => navigate("/auth/login")}>
            Sign in
          </button>
        </SubHeader>
      </FormHeader>
      <EmailInput value="" onChange={() => console.log("change")} />
      <SubmitButton
        style={{
          width: "100%",
          height: "65px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
        text="Send recovery email"
        type="submit"
        onClick={() => console.log("reset password")}
      />
    </FormContainer>
  )
}

export default PasswordResetForm
