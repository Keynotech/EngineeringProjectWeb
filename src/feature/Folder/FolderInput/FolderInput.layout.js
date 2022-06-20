/* eslint-disable react/prop-types */
/* eslint-disable no-unneeded-ternary */
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
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
  width: min(460px, 95vw);
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

function FolderInputLayout({
  onSubmit,
  submitText,
  onCancel,
  folder,
  dialogName,
}) {
  const { t } = useTranslation()

  // Validation
  // ===========================================================================
  const CreateFolderSchema = Yup.object().shape({
    folderName: Yup.string()
      .min(1, "")
      .max(50, t("validation.max50Cha"))
      .required(),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      folderName: "",
    },
    validationSchema: CreateFolderSchema,
    onSubmit: (values) => {
      onSubmit({ values })
    },
  })

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    if (folder) {
      formik.setFieldValue("folderName", folder.folderName)
    }
  }, [folder])

  return (
    <Dialog icon={<Icon />} dialogName={dialogName} onOutsideClick={onCancel}>
      <Form onSubmit={formik.handleSubmit}>
        <Label htmlFor="folderName">{t("folders.folderName")}</Label>
        <PropertieInput>
          <TextInput
            id="folderName"
            name="folderName"
            value={formik.values.folderName}
            onChange={(val) => {
              formik.setFieldValue("folderName", val)
            }}
            placeholder={t("folders.folderName")}
            fontSize="14px"
            multiline={false}
            autoFocus
            maxLength={50}
          />
        </PropertieInput>
        <Footer>
          <CancelButton type="button" onClick={onCancel} text={t("cancel")} />
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

export default FolderInputLayout
