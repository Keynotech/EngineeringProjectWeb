import React from "react"

import {
  Form,
  FormSocialAuth,
  FormInput,
  FormSubHeader,
} from "../../features/Form/Form"

function SignUpForm() {
  return (
    <Form title="Sign Up">
      <FormSubHeader
        text="Already have an account?"
        linkName="Sign in"
        route="/auth/login"
      />
      <FormSocialAuth />
      <FormInput
        displayTerms
        submitText="Sign up with email"
        onSubmit={() => console.log("sign up")}
      />
    </Form>
  )
}

export default SignUpForm
