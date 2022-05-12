import React from "react"
import OutsideClickHandler from "react-outside-click-handler"
import styled, { css } from "styled-components"

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

const DialogWrapper = styled.div`
  width: min(460px, 100vw);
  height: auto;
  background-color: ${(props) => props.theme.background};
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.tertiary};
  z-index: 9999;
`

const Icon = styled.span ``

const Title = styled.span ``

function Dialog{icon, title,onOutsideClick}) {

  // Effect Hooks
  // ===========================================================================

  return (
    <Overlay>
      <OverlayContainer>
        <OutsideClickHandler onOutsideClick={onOutsideClick}>
          <DialogWrapper>
            <Wrapper>
              <Header>
                {icon? <Icon>{icon}</Icon> : null}
                {title? <Title>{title}</Title> : null}
              </Header>
              {children}
            </Wrapper>
          </DialogWrapper>
        </OutsideClickHandler>
      </OverlayContainer>
    </Overlay>
  )
}

export default Dialog
