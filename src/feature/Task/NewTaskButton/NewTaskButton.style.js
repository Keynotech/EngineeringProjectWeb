/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components"
import zIndex from "../../../utils/zIndex"

export const Button = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 25px;
  background-color: ${(props) => props.theme.brandColor};
  box-shadow: 0 2px 8px ${(props) => props.theme.brandColor};
  z-index: ${zIndex.level2};
  opacity: 1;
  transition: opacity 0.25s linear;

  &:hover {
    box-shadow: 0 2px 14px ${(props) => props.theme.brandColor};
  }

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
