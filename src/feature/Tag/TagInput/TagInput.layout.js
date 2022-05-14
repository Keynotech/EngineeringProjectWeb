/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import styled, { css } from "styled-components"
import TextInput from "../../../components/input/TextInput"
import CancelButton from "../../../components/button/CancelButton"
import SubmitButton from "../../../components/button/SubmitButton"
import Dialog from "../../../components/Dialog/Dialog"

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  margin-right: 5px;
  background-color: ${(props) => props.theme.tertiary};
  ${({ color }) =>
    color &&
    css`
      background-color: color;
    `}
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 15px;
`

const Label = styled.label`
  text-transform: uppercase;
  font-weight: 600;
`

const PropertieInput = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
`

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
`

function TagInputLayout({ onSubmit, submitText, onCancel, tag, dialogName }) {
  // Validation
  // ===========================================================================
  const CreateTagSchema = Yup.object().shape({
    tagName: Yup.string().min(1, "").max(50, "Max 50 characters").required(),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      tagName: "",
    },
    validationSchema: CreateTagSchema,
    onSubmit: (values) => {
      onSubmit({ values })
    },
  })

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (tag) {
      formik.setFieldValue("tagName", tag.tagName)
    }
  }, [tag])

  return (
    <Dialog icon={<Icon />} dialogName={dialogName} onOutsideClick={onCancel}>
      <Form onSubmit={formik.handleSubmit}>
        <Label htmlFor="tagName">Tag name</Label>
        <PropertieInput>
          <TextInput
            id="tagName"
            name="tagName"
            value={formik.values.tagName}
            onChange={(val) => {
              formik.setFieldValue("tagName", val)
            }}
            placeholder="Tag name"
            fontSize="14px"
            multiline={false}
            autoFocus
            maxLength={50}
          />
        </PropertieInput>
        <Footer>
          <CancelButton type="button" onClick={onCancel} text="Cancel" />
          <SubmitButton
            disabled={!(formik.isValid && formik.dirty)}
            text={submitText}
            type="submit"
          />
        </Footer>
      </Form>
    </Dialog>
  )
}

export default TagInputLayout
