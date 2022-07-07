/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

function FormContainer({ children }) {
  return <Container>{children}</Container>
}

export default FormContainer
