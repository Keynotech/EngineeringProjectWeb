/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Input } from "@mui/material"
import PropTypes from "prop-types"
import styled, { css, useTheme } from "styled-components"
import CancelButton from "../button/CancelButton"
import SubmitButton from "../button/SubmitButton"
import useWindowSize from "../../hooks/useWindowSize"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
  transition: all 0.3s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      padding: 0 20px;
      z-index: 9999;
      height: 100%;
      width: 100%;
    `};
`

const InputContainer = styled.div`
  padding: 0;
  transition: padding 0.25s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      padding: 8px;
      border: 1px solid ${(props) => props.theme.tertiary};
      border-radius: 8px;
    `};
`

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;
  opacity: 0;
  margin-top: 10px;
  height: 0;
  transition: height 0.25s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      opacity: 1;
    `};
`

function TextSubmitInput({
  value,
  onChange,
  multiline,
  minRows,
  maxRows,
  placeholder,
  fontSize,
  fontWeight,
  autoFocus,
  id,
  name,
  maxLength,
}) {
  const theme = useTheme()
  const [inputValue, setInputValue] = useState(" ")
  const [isFocus, setIsFocus] = useState(false)
  const windowSize = useWindowSize()
  const handleChange = (event) => setInputValue(event.target.value)

  const onCancel = () => {
    setInputValue(value)
    setIsFocus(false)
  }

  const onSubmit = () => {
    onChange(inputValue)
    setIsFocus(false)
  }

  useEffect(() => {
    setInputValue(value)
  }, [value])

  return (
    <Wrapper isFocus={isFocus}>
      <InputContainer isFocus={isFocus}>
        <Input
          id={id}
          name={name}
          value={inputValue}
          onChange={(e) => handleChange(e)}
          placeholder={placeholder}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          inputProps={{
            maxLength,
          }}
          disableUnderline
          fullWidth
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoFocus={autoFocus}
          sx={{
            padding: 0,
            margin: 0,
            fontSize: { fontSize },
            color: theme.textSecondary,
            fontWeight,
            "& 	.MuiInput-input	": {
              padding: 0,
              lineHeight: "16px",
            },
            fontFamily:
              "-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Apple Color Emoji,Helvetica,Arial,sans-serif,Segoe UI Emoji,Segoe UI Symbol;",
          }}
        />
      </InputContainer>
      <ButtonsContainer isFocus={isFocus}>
        <CancelButton type="button" onClick={onCancel} text="Cancel" />
        <SubmitButton
          disabled={false}
          text="Submit"
          type="button"
          onClick={onSubmit}
        />
      </ButtonsContainer>
    </Wrapper>
  )
}
TextSubmitInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  fontSize: PropTypes.string,
  autoFocus: PropTypes.bool,
  fontWeight: PropTypes.number,
  maxLength: PropTypes.number,
}

TextSubmitInput.defaultProps = {
  value: "",
  multiline: true,
  minRows: 1,
  maxRows: 1,
  placeholder: "",
  fontSize: "12px",
  fontWeight: 400,
  autoFocus: false,
}

export default TextSubmitInput
