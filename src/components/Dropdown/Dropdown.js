/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"

const DropdownMenu = styled.div`
  text-align: center;
  z-index: 999;
  overflow-y: auto;
  border-radius: 5px;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.tertiary};
  box-shadow: 0 0 10px ${(props) => props.theme.tertiary};
`

function Dropdown(props) {
  const { toggleComponent, menuComponent, isOpen } = props
  const toggleRef = useRef(null)
  const dropdownRef = useRef(null)
  // the ref for the arrow must be a callback ref
  const [arrowRef, setArrowRef] = useState(null)

  const { styles, attributes } = usePopper(
    toggleRef.current,
    dropdownRef.current,
    {
      modifiers: [
        {
          name: "arrow",
          options: {
            element: arrowRef,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    }
  )

  return (
    <>
      <div ref={toggleRef}>{toggleComponent}</div>
      {isOpen ? (
        <DropdownMenu
          ref={dropdownRef}
          style={styles.popper}
          {...attributes.popper}
        >
          <div ref={setArrowRef} style={styles.arrow} id="arrow" />
          {menuComponent}
        </DropdownMenu>
      ) : null}
    </>
  )
}

export default Dropdown
