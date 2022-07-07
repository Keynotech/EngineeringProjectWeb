import React from "react"
import {
  FormBody,
  FormContent,
  FormImage,
} from "../../components/Form/FormBody"
import PasswordResetForm from "../../features/Forms/PassworedResetForm"

function PasswordResetPage() {
  return (
    <FormBody>
      <FormContent>
        <PasswordResetForm />
      </FormContent>
      <FormImage>
        <img
          width="100%"
          alt="loading-screen"
          src={`${process.env.PUBLIC_URL}/assets/undraw_forgot_password_re_hxwm.svg`}
        />
      </FormImage>
    </FormBody>
  )
}
export default PasswordResetPage
