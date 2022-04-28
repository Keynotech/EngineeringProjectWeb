import styled, { css } from "styled-components"

export const Propertie = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 20px;
  gap: 5px;
  color: ${(props) => props.theme.textTertiary};
  font-size: 18px;
  padding: 2px 6px;
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
`
export const PropertieValue = styled.span`
  font-size: 12px;
`

export const DropDownWrapper = styled.div`
  min-width: 200px;
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 9999;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
  padding: 15px 0px;
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
  gap: 8px;
`

export const DropDownItem = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 4px 6px;

  &:hover {
    background-color: aliceblue;
    border-radius: 4px;
  }
`
