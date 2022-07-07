import React from "react"
import {
  FormBody,
  FormContent,
  FormImage,
} from "../../components/Form/FormBody"
import SignUpForm from "../../features/Forms/SignUpForm"

function SignUpPage() {
  return (
    <FormBody>
      <FormContent>
        <SignUpForm />
      </FormContent>
      <FormImage>
        <img
          width="100%"
          alt="loading-screen"
          src={`${process.env.PUBLIC_URL}/assets/undraw_authentication_re_svpt.svg`}
        />
      </FormImage>
    </FormBody>
  )
}

export default SignUpPage
