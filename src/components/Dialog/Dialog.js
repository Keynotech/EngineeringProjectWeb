/* eslint-disable react/prop-types */
import React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import styled from "styled-components"

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

const DialogContainer = styled.div`
  position: relative;
  bottom: 48px;
  width: min(460px, 95vw);
  height: auto;
  background-color: ${(props) => props.theme.background};
  border-radius: 10px;
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
  gap: 10px;
  padding: 8px 15px;
  min-height: 24px;
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
`

const Icon = styled.span``

const Title = styled.span`
  font-weight: 700;
  font-size: 16px;
`

function Dialog({ icon, dialogName, onOutsideClick, children }) {
  // Effect Hooks
  // ===========================================================================

  return (
    <Overlay>
      <OverlayContainer>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DialogContainer>
            <Wrapper>
              <Header>
                {icon ? <Icon>{icon}</Icon> : null}
                {dialogName ? <Title>{dialogName}</Title> : null}
              </Header>
              {children}
            </Wrapper>
          </DialogContainer>
        </OutsideClickHandler>
      </OverlayContainer>
    </Overlay>
  )
}

export default Dialog
