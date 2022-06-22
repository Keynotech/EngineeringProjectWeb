import React from "react"
// import FormLayout from "../../components/layout/FormLayout"
import {
  FormBody,
  FormContent,
  FormImage,
} from "../../components/layout/FormBody"
import LoginForm from "./LoginForm"

function LoginPage() {
  return (
    <FormBody>
      <FormContent>
        <LoginForm />
      </FormContent>
      <FormImage>
        <img
          width="100%"
          alt="loading-screen"
          src={`${process.env.PUBLIC_URL}/assets/undraw_enter_uhqk.svg`}
        />
      </FormImage>
    </FormBody>
  )
}

export default LoginPage
