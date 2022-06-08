/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { Input } from "@mui/material"
import PropTypes from "prop-types"
import styled, { css, useTheme } from "styled-components"
import CancelButton from "../../../components/button/CancelButton"
import SubmitButton from "../../../components/button/SubmitButton"
import useWindowSize from "../../../hooks/useWindowSize"
import { SectionHeader } from "./TaskPage.style"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  background-color: ${(props) => props.theme.background};
  padding: 0;
  transition: all 0.3s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      position: absolute;
      z-index: 9999;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      padding: 0px 15px;
    `};
`

const InputContainer = styled.div`
  min-height: 0px;
  max-height: 100%;

  ${({ isFocus }) =>
    isFocus &&
    css`
      border-radius: 8px;
      border: 1px solid ${(props) => props.theme.tertiary};
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

const UnsavedContainer = styled.span`
  color: ${(props) => props.theme.textTertiary};
  font-weight: 400;
`

function DescriptionInput({
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
  const [inputValue, setInputValue] = useState(value)
  const [isSaved, setIsSaved] = useState(true)
  const [isFocus, setIsFocus] = useState(false)

  // Handlers
  // ===========================================================================

  const handleChange = (event) => {
    setInputValue(event.target.value)
    setIsSaved(false)
  }

  const onCancel = () => {
    setInputValue(value)
    setIsSaved(true)
    setIsFocus(false)
  }

  const onSubmit = () => {
    onChange(inputValue)
    setIsSaved(true)
    setIsFocus(false)
  }

  // Others
  // ===========================================================================
  const theme = useTheme()
  const windowSize = useWindowSize()
  const maxRows = windowSize.height / 24

  return (
    <OutsideClickHandler
      disabled={!isFocus}
      onOutsideClick={onCancel}
      useCapture={false}
    >
      <Wrapper isFocus={isFocus}>
        <SectionHeader>
          Description{" "}
          {isSaved ? null : <UnsavedContainer>Unsaved</UnsavedContainer>}
        </SectionHeader>
        <InputContainer isFocus={isFocus}>
          <Input
            id={id}
            name={name}
            value={inputValue}
            onChange={handleChange}
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
            autoFocus={autoFocus}
            sx={{
              padding: "8px",
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
        {isFocus ? (
          <ButtonsContainer>
            <CancelButton
              type="button"
              onClick={onCancel}
              text="Cancel"
              style={{ width: "100%" }}
            />
            <SubmitButton
              disabled={false}
              text="Submit"
              type="button"
              onClick={onSubmit}
              style={{ width: "100%" }}
            />
          </ButtonsContainer>
        ) : null}
      </Wrapper>
    </OutsideClickHandler>
  )
}
DescriptionInput.propTypes = {
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

DescriptionInput.defaultProps = {
  value: "",
  multiline: true,
  minRows: 1,
  placeholder: "",
  fontSize: "12px",
  fontWeight: 400,
  autoFocus: false,
}

export default DescriptionInput
