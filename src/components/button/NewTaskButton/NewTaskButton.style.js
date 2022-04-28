/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components"

export const Button = styled.button`
  position: absolute;
  right: 30px;
  bottom: 30px;
  width: 40px;
  height: 40px;
  z-index: 9999;
  border-radius: 25px;
  background-color: ${(props) => props.theme.brandColor};
  opacity: 1;
  transition: opacity 0.25s cubic-bezier(0.42, 0, 1, 1);

  ${({ isTaskInputOpen }) =>
    isTaskInputOpen &&
    css`
      opacity: 0;
    `};
`
export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
