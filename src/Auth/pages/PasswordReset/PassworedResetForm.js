import React from "react"

import { Form, FormInput, FormSubHeader } from "../../features/Form/Form"

function PasswordResetForm() {
  return (
    <Form title="Reset password ">
      <FormSubHeader
        text="Just remembered?"
        linkName="Sign in"
        route="/auth/login"
      />
      <FormInput
        displayTerms
        submitText="Send recovery email"
        onSubmit={() => console.log("reset password")}
      />
    </Form>
  )
}

export default PasswordResetForm
