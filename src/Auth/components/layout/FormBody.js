/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
import React, { Children } from "react"
import styled from "styled-components"
import { mq } from "../../../utils/mq"

const FormWrapper = styled.div`
  display: flex;
  padding: 15px;
  width: 100%;

  @media ${mq.laptop} {
    padding: 30px;
    width: 50%;
  }
`
function FormContent({ children }) {
  return <FormWrapper>{children}</FormWrapper>
}

const ImageWrapper = styled.div`
  display: none;

  @media ${mq.laptop} {
    width: 50%;
    padding: 4% 8%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

function FormImage({ children }) {
  return <ImageWrapper>{children}</ImageWrapper>
}

const FormBodyWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media ${mq.laptop} {
    margin: 70px auto;
    min-width: 1000px;
    max-width: 1000px;
    max-height: 700px;
  }
`

function FormBody({ children }) {
  let _formContent = null
  let _formImage = null

  Children.forEach(children, (child) => {
    if (child.type === FormContent) {
      _formContent = child
    } else if (child.type === FormImage) {
      _formImage = child
    }
  })

  if (_formContent === null || _formImage === null) {
    return null
  }

  return (
    <FormBodyWrapper>
      {_formContent}
      {_formImage}
    </FormBodyWrapper>
  )
}

FormBody.FormContent = FormContent
FormBody.Image = FormImage

export { FormBody, FormContent, FormImage }
