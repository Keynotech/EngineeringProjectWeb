/* eslint-disable no-unneeded-ternary */
import React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import TextInput from "../../../components/input/TextInput"
import { hideTagInput } from "../../../store/features/layoutSlice"
import CancelButton from "../../../components/button/CancelButton"
import SubmitButton from "../../../components/button/SubmitButton"
import useCreateTag from "../../../hooks/mutation/useCreateTag"

const Overlay = styled.div`
  position: absolute;
  z-index: 998;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const OverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const Dialog = styled.div`
  width: min(460px, 100vw);
  height: auto;
  background-color: ${(props) => props.theme.background};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.tertiary};
  z-index: 9999;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 16px;
  gap: 10px;
  padding: 8px 15px;
  min-height: 24px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

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

function TagInput() {
  // Mutations
  // ===========================================================================
  const createTag = useCreateTag()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTagInput = () => {
    dispatch(hideTagInput())
  }

  // Validation
  // ===========================================================================
  const CreateTagSchema = Yup.object().shape({
    tagName: Yup.string().max(50, "Max 50 characters").required(),
  })

  // Forms
  // ===========================================================================
  const formik = useFormik({
    initialValues: {
      tagName: "",
    },
    validationSchema: CreateTagSchema,
    onSubmit: (values) => {
      createTag.mutate({ tagName: values.tagName })
      _hideTagInput()
    },
  })

  // Effect Hooks
  // ===========================================================================

  return (
    <Overlay>
      <OverlayContainer>
        <OutsideClickHandler onOutsideClick={_hideTagInput}>
          <Dialog>
            <Wrapper>
              <Header>
                <Icon />
                Create new tag
              </Header>
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
                    placeholder="New tag name"
                    fontSize="14px"
                    multiline={false}
                    autoFocus
                    maxLength={50}
                  />
                </PropertieInput>
                <Footer>
                  <CancelButton
                    type="button"
                    onClick={_hideTagInput}
                    text="Cancel"
                  />
                  <SubmitButton
                    disabled={!(formik.isValid && formik.dirty)}
                    text="Create"
                    type="submit"
                  />
                </Footer>
              </Form>
            </Wrapper>
          </Dialog>
        </OutsideClickHandler>
      </OverlayContainer>
    </Overlay>
  )
}

export default TagInput
