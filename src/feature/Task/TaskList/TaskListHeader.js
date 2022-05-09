/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import zIndex from "../../../utils/zIndex"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  gap: 10px;
  padding: 15px 0px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  z-index: ${zIndex.level1};
  height: 32px;
  border-bottom: 1px solid transparent;
`

const Icon = styled.span`
  display: flex;
  align-items: center;
  min-width: 32px;
  font-size: 32px;
`

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  height: 20px;
  align-items: flex-end;
`

const Name = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: ${(props) => props.theme.textPrimary};
`

const Info = styled.span`
  font-size: 18px;
  font-weight: 500;
  padding-left: 14px;
  color: ${(props) => props.theme.textTertiary};
  opacity: 0.8;
`

function TaskListHeader({ icon, name, additionaInfo }) {
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <TextContainer>
        <Name>{name}</Name>
        {additionaInfo ? <Info>{additionaInfo}</Info> : null}
      </TextContainer>
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

/* <button type="button" onClick={() => dispatch(toggleDisplayDetails())}>
        {isDetailDisplay ? "Hide details" : "Show details"}
      </button> */
