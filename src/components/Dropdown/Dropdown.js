import React from "react"
import styled, { css } from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  position: absolute;
  overflow-y: auto;
  z-index: 9999;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.tertiary};
  border-radius: 5px;
  visibility: hidden;
  box-shadow: 0 0 10px ${(props) => props.theme.tertiary};
  left: ${(props) => props.left || 0};
  top: ${(props) => props.top || 0};

  ${({ isOpen }) =>
    isOpen &&
    css`
      visibility: visible;
    `}
`

const Container = styled.div``

function Dropdown({ isOpen, parentPosition, children }) {
  console.log(parentPosition)
  return (
    <Wrapper isOpen={isOpen}>
      <Container>{children}</Container>
    </Wrapper>
  )
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  parentPosition: PropTypes.objectOf(PropTypes.number).isRequired,
  children: PropTypes.element.isRequired,
}

Dropdown.defaultProps = {
  isOpen: false,
}

export default Dropdown
