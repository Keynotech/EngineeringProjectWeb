/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Children, useState } from "react"
import styled, { useTheme } from "styled-components"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import GoogleIcon from "@mui/icons-material/Google"
import AppleIcon from "@mui/icons-material/Apple"
import SocialAuthButton from "../../components/SocialAuthButton"
import SubmitButton from "../../../components/button/SubmitButton"
import TextInput from "../../../components/TextInput/TextInput"
import EmailInput from "../Input/EmailInput"
import PasswordInput from "../Input/PasswordInput"
import Checkbox from "../../../components/Checkbox/Checkbox"

const HeaderText = styled.h1`
  font-size: 40px;
  font-weight: 600;
`

function FormHeader({ title, subHeader }) {
  return <HeaderText>{title}</HeaderText>
}

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

function FormSubHeader({ text, linkName, route }) {
  let link = null

  if (linkName && route) {
    const navigate = useNavigate()
    link = (
      <button type="button" onClick={() => navigate(route)}>
        {linkName}
      </button>
    )
  }

  return (
    <SubHeader>
      {text} {link}
    </SubHeader>
  )
}

const SocialButtonsWraper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`

function FormSocialAuth() {
  return (
    <SocialButtonsWraper>
      <SocialAuthButton
        icon={<GoogleIcon color="inherit" />}
        text="Continue with Google"
      />
      <SocialAuthButton
        icon={<AppleIcon color="inherit" />}
        text="Continue with Apple"
      />
    </SocialButtonsWraper>
  )
}

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const TermsAccept = styled.span`
  display: inline-flex;
  gap: 20px;

  p {
    color: ${(props) => props.theme.textTertiary};
  }
`

function FormInput({ submitText, onSubmit, displayTerms }) {
  let terms = null

  if (displayTerms) {
    terms = (
      <TermsAccept>
        <p>
          {
            " By continuing with Google, Apple, or Email, you agree to JetTasks's Terms of Service and Privacy Policy."
          }
        </p>
      </TermsAccept>
    )
  }
  return (
    <InputWrapper>
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
      {terms}
    </InputWrapper>
  )
}

const FormContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`

function Form({ children, title }) {
  let _formHeader = null

  if (title) {
    _formHeader = <FormHeader title={title} />
  }

  return (
    <FormContainer>
      {_formHeader}
      {children}
    </FormContainer>
  )
}

export { Form, FormSubHeader, FormSocialAuth, FormInput }

/*


const Wrapper = styled.div`
  @media ${mq.laptop} {
    text-align: center;
    display: flex;
    justify-content: center;
    margin: 70px auto;
    min-height: 620px;
    width: 66%;
    max-width: 1100px;
    min-width: 1000px;
  }
`

const FormWrapper = styled.div`
  @media ${mq.laptop} {
    width: 50%;
    padding: 8% 6%;
    display: flex;
    justify-content: center;
    border: 1px solid black;
  }
`


*/
