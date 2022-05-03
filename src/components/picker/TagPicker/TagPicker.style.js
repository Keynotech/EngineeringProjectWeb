import styled, { css } from "styled-components"

export const DropDownWrapper = styled.div`
  min-width: 200px;
  max-height: min(400px, 30vh);
  overflow-y: auto;
  position: absolute;
  top: 110px;
  left: 16px;
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
  padding-bottom: 14px;
`

export const DropDownItem = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;

  &:hover {
    background-color: ${(props) => props.theme.primary};
  }
`

export const AddNewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  min-height: 24px;
`
