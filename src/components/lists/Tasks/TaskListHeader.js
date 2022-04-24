import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 15px 6px;
  color: ${(props) => props.theme.textSecondary};
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  min-width: 24px;
  min-height: 24px;
  font-size: 24px;
`

const Name = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: ${(props) => props.theme.textPrimary};
`

const Info = styled.span`
  font-size: 20px;
  font-weight: 500;
`

function TaskListHeader({ icon, name, additionaInfo }) {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Name>{name}</Name>
      {additionaInfo ? <Info>{additionaInfo}</Info> : null}
    </Wrapper>
  )
}

TaskListHeader.propTypes = {
  icon: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  additionaInfo: PropTypes.string,
}

TaskListHeader.defaultProps = {
  additionaInfo: null,
}

export default TaskListHeader
