/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import SubmitButton from "../../../components/button/SubmitButton"
import EmailInput from "../Input/EmailInput"
import PasswordInput from "../Input/PasswordInput"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const PasswordResetLink = styled.button`
  color: ${(props) => props.theme.textTertiary};
  text-decoration: underline;
  text-align: left;
`

const TermsInfo = styled.span`
  display: inline-flex;
  gap: 20px;

  p {
    color: ${(props) => props.theme.textTertiary};
  }
`

function FormSignInput({ submitText, onSubmit, displayPasswordReset }) {
  let passwordReset = null

  if (displayPasswordReset) {
    const navigate = useNavigate()
    passwordReset = (
      <PasswordResetLink type="button" onClick={() => navigate("/auth/reset")}>
        {" Don't remember password?"}
      </PasswordResetLink>
    )
  }

  return (
    <Wrapper>
      <EmailInput value="" onChange={() => console.log("change")} />
      <PasswordInput value="" onChange={() => console.log("change")} />
      <SubmitButton
        style={{
          width: "100%",
          height: "65px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
        text={submitText}
        type="submit"
        onClick={() => {
          onSubmit()
        }}
      />
      {passwordReset}
      <TermsInfo>
        {
          " By continuing with Google, Apple, or Email, you agree to JetTasks's Terms of Service and Privacy Policy."
        }
      </TermsInfo>
    </Wrapper>
  )
}

FormSignInput.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  displayPasswordReset: PropTypes.bool,
}

FormSignInput.defaultProps = {
  displayPasswordReset: false,
}

export default FormSignInput
