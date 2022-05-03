import styled, { css } from "styled-components"

export const DropDownWrapper = styled.div`
  min-width: 200px;
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 9999;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
  visibility: hidden;
  box-shadow: 0 0 10px ${(props) => props.theme.tertiary};

  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
    `}
`

export const DropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DropDownItem = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 5px 6px;

  &:hover {
    background-color: ${(props) => props.theme.primary};
  }
`
