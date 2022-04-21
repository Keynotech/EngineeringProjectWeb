import React from "react"
import styled from "styled-components"
import PropTypes, { element } from "prop-types"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
`
const Container = styled.div`
  max-width: 1440px;
  width: 100%;
  padding-top: 30px;
  padding-bottom: 120px;
`

function MainLayout({ children }) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  )
}

MainLayout.propTypes = {
  children: PropTypes.arrayOf(element).isRequired,
}

export default MainLayout
