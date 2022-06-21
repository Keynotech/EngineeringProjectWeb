/* eslint-disable react/prop-types */
import React from "react"
import CloseIcon from "@mui/icons-material/Close"
import styled, { useTheme } from "styled-components"
import zIndex from "../../../utils/zIndex"

const Overlay = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
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

const DialogContainer = styled.div`
  position: absolute;
  height: auto;
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.tertiary};
  z-index: ${zIndex.level9};
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
  gap: 10px;
  padding: 0px 15px;
  min-height: 40px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
  position: relative;
`

export const OutsideClick = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: ${zIndex.level8};
  background-color: rgba(0, 0, 0, 0.4);
`

const Icon = styled.span``

const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
`

const CloseButtonWrapper = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 15px;
  position: absolute;
  right: 8px;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const CloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function Dialog({ icon, dialogName, onOutsideClick, children }) {
  const theme = useTheme()
  // Effect Hooks
  // ===========================================================================

  return (
    <>
      <Overlay>
        <OverlayContainer>
          <DialogContainer>
            <Wrapper>
              <Header>
                {icon ? <Icon>{icon}</Icon> : null}
                {dialogName ? <Title>{dialogName}</Title> : null}
                <CloseButtonWrapper>
                  <CloseButton>
                    <CloseIcon
                      sx={{ fontSize: "18px", color: theme.textTertiary }}
                      onClick={onOutsideClick}
                    />
                  </CloseButton>
                </CloseButtonWrapper>
              </Header>
              {children}
            </Wrapper>
          </DialogContainer>
        </OverlayContainer>
      </Overlay>
      <OutsideClick onClick={onOutsideClick} />
    </>
  )
}

export default Dialog
