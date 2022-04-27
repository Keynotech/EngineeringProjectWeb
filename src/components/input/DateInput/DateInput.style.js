import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  position: relative;
`
export const Propertie = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  position: absolute;
  top: 30px;
  left: -100px;
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
`

export const DatePickerWrapper = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
`
