import styled, { css } from "styled-components"

export const Wrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  z-index: 801;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justicy-content: center;
  padding: 8px 15px;
  background-color: ${(props) => props.theme.primary};
  border-bottom: 1px solid ${(props) => props.theme.tertiary};
  height: 40px;
  gap: 8px;
  transition: background-color 0.3s;

  ${({ isFocus }) =>
    isFocus &&
    css`
      background-color: ${(props) => props.theme.background};
    `};
`

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  height: 30px;
`

export const PropertiesContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`
export const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 8px;
`

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 800;
`
