/* eslint-disable no-unused-vars */
/* eslint-disable import/named */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import ClearIcon from "@mui/icons-material/Clear"
import Backdrop from "@mui/material/Backdrop"
import TextInput from "../TextInput"
import { hideTagInput } from "../../../app/store/features/layoutSlice"
import CancelButton from "../../button/CancelButton"
import SubmitButton from "../../button/SubmitButton"

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
  width: min(400px, 100vw);
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

const Form = styled.div`
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
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _hideTagInput = () => {
    dispatch(hideTagInput())
  }
  // Selectors &   Locale state
  // ===========================================================================
  const [tagName, setTagName] = useState("")
  const clearInput = () => {
    setTagName("")
  }

  // Mutations
  // ===========================================================================
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const createTag = useMutation(
    () =>
      fetch(`http://192.168.0.159:5000/tags/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ tagName }),
      }).then((res) => res.json()),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tags"])
        queryClient.setQueriesData(["tags", data._id], data)
      },
    }
  )

  // Hooks
  // ===========================================================================

  useEffect(() => {
    clearInput()
  }, [])

  // Others  // ===========================================================================

  return (
    <Overlay>
      <OverlayContainer>
        <Dialog>
          <Wrapper>
            <Header>
              <Icon />
              Create new tag
            </Header>
            <Form>
              <Label>Tag name</Label>
              <PropertieInput>
                <TextInput
                  value={tagName}
                  onChange={(value) => setTagName(value)}
                  placeholder="New tag name"
                  fontSize="14px"
                  multiline={false}
                  autoFocus
                />
              </PropertieInput>
              <Footer>
                <CancelButton onClick={_hideTagInput} text="Cancel" />
                <SubmitButton
                  text="Create"
                  onClick={() => {
                    createTag.mutate({
                      tagName,
                    })
                    _hideTagInput()
                  }}
                />
              </Footer>
            </Form>
          </Wrapper>
        </Dialog>
      </OverlayContainer>
    </Overlay>
  )
}

export default TagInput
