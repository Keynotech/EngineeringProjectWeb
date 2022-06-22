import React from "react"

import {
  Form,
  FormSocialAuth,
  FormInput,
  FormSubHeader,
} from "../../features/Form/Form"

function LoginForm() {
  return (
    <Form title="Sign in">
      <FormSubHeader
        text="Don't have an account?"
        linkName="Create one"
        route="/auth/signup"
      />
      <FormSocialAuth />
      <FormInput
        submitText="Sign in with email"
        onSubmit={() => console.log("login")}
      />
    </Form>
  )
}

export default LoginForm
