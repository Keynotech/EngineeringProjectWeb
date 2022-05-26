/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import styled, { css } from "styled-components"
import TextInput from "../../../components/TextInput/TextInput"
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

function ProjectInputLayout({
  onSubmit,
  submitText,
  onCancel,
  project,
  dialogName,
}) {
  // Validation
  // ===========================================================================
  const CreateProjectSchema = Yup.object().shape({
    projectName: Yup.string()
      .min(1, "")
      .max(50, "Max 50 characters")
      .required(),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      projectName: "",
    },
    validationSchema: CreateProjectSchema,
    onSubmit: (values) => {
      onSubmit({ values })
    },
  })

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (project) {
      formik.setFieldValue("projectName", project.projectName)
    }
  }, [project])

  return (
    <Dialog icon={<Icon />} dialogName={dialogName} onOutsideClick={onCancel}>
      <Form onSubmit={formik.handleSubmit}>
        <Label htmlFor="projectName">Project name</Label>
        <PropertieInput>
          <TextInput
            id="projectName"
            name="projectName"
            value={formik.values.projectName}
            onChange={(val) => {
              formik.setFieldValue("projectName", val)
            }}
            placeholder="Project name"
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

export default ProjectInputLayout
