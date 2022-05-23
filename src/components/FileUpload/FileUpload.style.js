import styled, { css, keyframes } from "styled-components"

const onEnterAnimationBackground = keyframes`
from {
    background-color: rgba(255, 255, 255, 0.0);
}

to {
    background-color: rgba(255, 255, 255, 0.7);
}
`

const onEnterAnimationSVG = keyframes`
from {
  transform: translateY(-80px);
}

to {
  transform: translate(0);
}
`

const onEnterAnimationText = keyframes`
from {
  transform: translateY(80px);
}

to {
  transform: translate(0);
}
`

export const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  visibility: hidden;

  ${({ isActive }) =>
    isActive &&
    css`
      visibility: visible;
      background-color: rgba(255, 255, 255, 0.7);
      animation: ${onEnterAnimationBackground} 0.25s linear 1;
    `}

  ${({ isDragOver }) =>
    isDragOver &&
    css`
      transition: none;
      background-color: rgba(255, 255, 255, 0.5);
    `}
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: opacity 0.5s;
  position: relative;

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1;
      img {
        width: 20%;
        height: auto;
        animation: ${onEnterAnimationSVG} 0.35s ease-in 1;
        pointer-events: none;
      }

      span {
        animation: ${onEnterAnimationText} 0.35s ease-in 1;
        pointer-events: none;
      }
    `}
`

export const Title = styled.span`
  font-size: 24px;
  font-weight: 600;
`

export const SubTitle = styled.span`
  font-size: 14px;
`
