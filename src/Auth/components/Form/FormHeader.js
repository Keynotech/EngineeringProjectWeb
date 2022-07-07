import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const HeaderText = styled.h1`
  font-size: 40px;
  font-weight: 600;
`

function FormHeader({ title, children }) {
  return (
    <Wrapper>
      <HeaderText>{title}</HeaderText>
      {children}
    </Wrapper>
  )
}

FormHeader.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
}

FormHeader.defaultProps = {
  children: null,
}

export default FormHeader
