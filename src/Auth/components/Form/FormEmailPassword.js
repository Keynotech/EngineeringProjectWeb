/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import PropTypes from "prop-types"
import * as Yup from "yup"
import { useFormik } from "formik"
import SubmitButton from "../../../components/button/SubmitButton"
import EmailInput from "../Input/EmailInput"
import PasswordInput from "../Input/PasswordInput"

const Wrapper = styled.form`
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

function FormEmailPassword({ submitText, onSubmit, displayPasswordReset }) {
  let passwordReset = null

  if (displayPasswordReset) {
    const navigate = useNavigate()
    passwordReset = (
      <PasswordResetLink type="button" onClick={() => navigate("/auth/reset")}>
        {" Don't remember password?"}
      </PasswordResetLink>
    )
  }

  const FormSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: FormSchema,
    onSubmit: (values) => {
      onSubmit({ email: values.email, password: values.password })
    },
  })

  return (
    <Wrapper onSubmit={formik.handleSubmit}>
      <EmailInput
        id="email"
        name="email"
        value={formik.values.email}
        onChange={(val) => formik.setFieldValue("email", val)}
      />
      <PasswordInput
        id="password"
        name="password"
        value={formik.values.password}
        onChange={(val) => formik.setFieldValue("password", val)}
      />
      <SubmitButton
        disabled={!(formik.isValid && formik.dirty)}
        style={{
          width: "100%",
          height: "65px",
          fontSize: "18px",
          borderRadius: "8px",
        }}
        text={submitText}
        type="submit"
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

FormEmailPassword.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  displayPasswordReset: PropTypes.bool,
}

FormEmailPassword.defaultProps = {
  displayPasswordReset: false,
}

export default FormEmailPassword
