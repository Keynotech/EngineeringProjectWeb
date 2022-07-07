import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.button`
  border: 1px solid #bfbfbf;
  background-color: ${(props) => props.theme.background};
  border-radius: 12px;
  min-height: 65px;
  width: 100%;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40px;
  color: ${(props) => props.theme.textPrimary};
`

const Text = styled.span`
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.textPrimary};
`

function SocialAuthButton({ icon, text, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <Container>
        <IconWrapper>{icon}</IconWrapper>
        <Text>{text}</Text>
      </Container>
    </Wrapper>
  )
}

SocialAuthButton.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SocialAuthButton
