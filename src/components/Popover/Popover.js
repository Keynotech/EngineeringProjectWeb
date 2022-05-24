/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef } from "react"
import styled from "styled-components"
import { usePopper } from "react-popper"
import zIndex from "../../utils/zIndex"

const PopoverWrapper = styled.div`
  text-align: center;
  z-index: ${zIndex.level9};
  overflow-y: auto;
  border-radius: 10px;
  background-color: ${(props) => props.theme.background};
  border: 1px solid ${(props) => props.theme.tertiary};
  box-shadow: 0 2px 10px ${(props) => props.theme.tertiary};
`

function Popover({ children, isOpen, anchorEl }) {
  const PopoverRef = useRef(null)
  const [arrowRef, setArrowRef] = useState(null)

  const { styles, attributes } = usePopper(anchorEl, PopoverRef.current, {
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
          offset: [0, 4],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altAxis: true,
          padding: 15,
        },
      },
    ],
  })

  return isOpen ? (
    <PopoverWrapper
      ref={PopoverRef}
      style={styles.popper}
      {...attributes.popper}
    >
      <div ref={setArrowRef} style={styles.arrow} id="arrow" />
      {children}
    </PopoverWrapper>
  ) : null
}

export default Popover
