/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: 0;
  gap: 10px;
  color: ${(props) => props.theme.textSecondary};
  background-color: ${(props) => props.theme.background};
  height: 64px;
`

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  height: 24px;
  align-items: flex-end;
`

const Name = styled.span`
  font-weight: 700;
  font-size: 20px;
  line-height: 1.1;
  color: ${(props) => props.theme.textPrimary};
`

const Info = styled.span`
  font-size: 20px;
  line-height: 1.1;
  font-weight: 500;
  padding-left: 14px;
  color: ${(props) => props.theme.textTertiary};
  opacity: 0.8;
`

function TaskListHeader({ children, name, additionaInfo }) {
  let childrenElem = null
  if (children) {
    childrenElem = <div>{children}</div>
  }
  return (
    <Wrapper>
      <TextContainer>
        <Name>{name}</Name>
        {additionaInfo ? <Info>{additionaInfo}</Info> : null}
      </TextContainer>
      {childrenElem}
    </Wrapper>
  )
}

TaskListHeader.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  additionaInfo: PropTypes.string,
}

TaskListHeader.defaultProps = {
  children: null,
  additionaInfo: null,
}

export default TaskListHeader

/* <button type="button" onClick={() => dispatch(toggleDisplayDetails())}>
        {isDetailDisplay ? "Hide details" : "Show details"}
      </button> */
