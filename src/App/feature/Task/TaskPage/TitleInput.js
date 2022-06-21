/* eslint-disable no-use-before-define */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Input } from "@mui/material"
import PropTypes from "prop-types"
import { useFormik } from "formik"
import * as Yup from "yup"
import OutsideClickHandler from "react-outside-click-handler"
import styled, { css, useTheme } from "styled-components"
import CancelButton from "../../../../components/button/CancelButton"
import SubmitButton from "../../../../components/button/SubmitButton"

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 10px;
  background-color: ${(props) => props.theme.background};
  transition: all 0.3s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 9999;
      padding: 20px 15px;
      border-bottom: 1px solid ${(props) => props.theme.tertiary};
    `};
`

const InputContainer = styled.div`
  min-height: 0px;
  max-height: 100%;

  ${({ isFocus }) =>
    isFocus &&
    css`
      min-height: 48px;
    `};
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

function TitleInput({
  value,
  onChange,
  multiline,
  minRows,
  placeholder,
  fontSize,
  fontWeight,
  autoFocus,
  id,
  name,
  maxLength,
}) {
  // Local state
  // ===========================================================================
  const [isFocus, setIsFocus] = useState(false)

  // Handlers
  // ===========================================================================

  const onCancel = () => {
    formik.setFieldValue("title", value)
    setIsFocus(false)
  }

  const onSubmit = (val) => {
    onChange(val)
    setIsFocus(false)
  }

  // Validation
  // ===========================================================================

  const CreateTaskSchema = Yup.object().shape({
    title: Yup.string().max(100, "Max 100 characters").required(""),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: CreateTaskSchema,

    onSubmit: (values) => {
      const valueToSubmit = values.title.replace(/^\s+|\s+$/g, "")
      formik.setFieldValue("title", valueToSubmit)
      onSubmit(valueToSubmit)
    },
  })

  // Effect Hooks
  // ===========================================================================

  useEffect(() => {
    formik.setFieldValue("title", value)
  }, [value])

  // Others
  // ===========================================================================
  const theme = useTheme()

  return (
    <OutsideClickHandler
      disabled={!isFocus}
      onOutsideClick={onCancel}
      useCapture={false}
    >
      <Wrapper isFocus={isFocus} onSubmit={formik.handleSubmit}>
        <InputContainer isFocus={isFocus}>
          <Input
            id="title"
            name="title"
            value={formik.values.title}
            onChange={(e) => {
              formik.setFieldValue("title", e.target.value)
            }}
            placeholder={placeholder}
            multiline={multiline}
            minRows={minRows}
            maxRows={10}
            inputProps={{
              maxLength,
            }}
            disableUnderline
            fullWidth
            onFocus={() => setIsFocus(true)}
            autoFocus={autoFocus}
            sx={{
              padding: 0,
              margin: 0,
              fontSize: { fontSize },
              color: theme.textSecondary,
              fontWeight,
              "& 	.MuiInput-input	": {
                padding: 0,
                lineHeight: "24px",
              },
              fontFamily:
                "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Apple Color Emoji,Helvetica,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol;",
            }}
          />
        </InputContainer>
        {isFocus ? (
          <ButtonsContainer>
            <CancelButton type="button" onClick={onCancel} text="Cancel" />
            <SubmitButton
              disabled={!(formik.isValid && formik.dirty)}
              text="Submit"
              type="submit"
            />
          </ButtonsContainer>
        ) : null}
      </Wrapper>
    </OutsideClickHandler>
  )
}
TitleInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  maxLength: PropTypes.number,
}

TitleInput.defaultProps = {
  value: "",
  multiline: true,
  minRows: 1,
  placeholder: "",
  fontSize: "12px",
  fontWeight: 400,
  autoFocus: false,
}

export default TitleInput
