import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import TextInput from "../../../components/TextInput/TextInput"

const Wrapper = styled.div`
  width: 100%;
  height: 65px;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 8px;
`

function EmailInput({ value, onChange }) {
  return (
    <Wrapper>
      <TextInput
        type="email"
        placeholder="exampleemail123@jettasks.com"
        multiline={false}
        fontSize="18px"
        value={value}
        onChange={(val) => onChange(val)}
      />
    </Wrapper>
  )
}

EmailInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default EmailInput
