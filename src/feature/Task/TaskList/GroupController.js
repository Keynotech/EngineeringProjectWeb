/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import styled, { css } from "styled-components"
import TaskMenu from "./TaskMenu"
import useGroupBy from "../../../hooks/filters/useGroupBy/useGroupBy"

const Button = styled.button`
  width: 200px;
  min-height: 32px;
  padding: 5px 10px 5px 20px;
  text-align: left;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${(props) => props.theme.secondary};
    `};
`

function GroupController({ data, onGroupChange, groupOptions }) {
  const { handleGroupOptionChange, groupOption } = useGroupBy({
    data,
    groupOptions,
    onGroupChange,
  })

  return (
    <TaskMenu>
      {groupOptions.map((group) => (
        <Button
          key={group.name}
          type="button"
          onClick={() => handleGroupOptionChange(group)}
          isActive={group.key === groupOption.key || false}
        >
          {group.name}
        </Button>
      ))}
    </TaskMenu>
  )
}

export default GroupController
