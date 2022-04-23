import React from "react"
import { useSelector, useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import { toggleSidebar } from "../../app/store/features/layoutSlice"

const Hamburger = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  padding: 2px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.tertiary};
  }
`

const HamburgerInner = styled.div`
  width: 18px;
  height: 2px;
  background-color: ${(props) => props.theme.textSecondary};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s cubic-bezier(0.42, 0, 1, 1);

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: transparent;
    `}

  &::before,
  &:after {
    content: "";
    width: 18px;
    height: 2px;
    background-color: ${(props) => props.theme.textSecondary};
    position: absolute;
    transition: transform 0.3s cubic-bezier(0.42, 0, 1, 1);
  }

  &:after {
    top: -6px;

    ${({ isActive }) =>
      isActive &&
      css`
        transform: translateY(6px) rotate(45deg);
      `}
  }
  &:before {
    top: 6px;

    ${({ isActive }) =>
      isActive &&
      css`
        transform: translateY(-6px) rotate(-45deg);
      `}
  }
`

function HamburgerMenu() {
  const dispatch = useDispatch()
  const sidebarVisibility = useSelector(
    (state) => state.layout.sidebarVisibility
  )
  return (
    <Hamburger onClick={() => dispatch(toggleSidebar())}>
      <HamburgerInner isActive={sidebarVisibility} />
    </Hamburger>
  )
}

export default HamburgerMenu
