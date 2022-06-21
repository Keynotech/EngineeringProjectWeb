import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { mq } from "../../utils/mq"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%; ;
`

const LoginSection = styled.div`
  flex: 1;
`

const ImageSection = styled.div`
  flex: 1;
`

function AuthSectionLayout() {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  )
}

export default AuthSectionLayout
