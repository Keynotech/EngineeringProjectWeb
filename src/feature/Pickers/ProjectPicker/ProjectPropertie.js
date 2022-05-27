/* eslint-disable react/require-default-props */
/* eslint-disable react/prop-types */
import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => props.theme.textTertiary};
`
const Value = styled.span`
  font-size: 12px;
  font-weight: 500;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border: 2px solid ${(props) => props.theme.textTertiary};
  border-radius: 5px;
`

function ProjectPropertie({
  value,
  displayValue,
  displayIcon,
  onClick,
  backgroundColor,
  border,
}) {
  const project = useSingleProjectQuery(value)

  return (
    <Wrapper style={{ backgroundColor, border }} onClick={onClick}>
      {displayIcon ? <Icon /> : null}
      {displayValue ? (
        <Value>{project ? project.projectName : "Inbox"}</Value>
      ) : null}
    </Wrapper>
  )
}

ProjectPropertie.propTypes = {
  onClick: PropTypes.func,
  displayValue: PropTypes.bool,
  displayIcon: PropTypes.bool,
}

ProjectPropertie.defaultProps = {
  displayValue: true,
  displayIcon: true,
}

export default ProjectPropertie
