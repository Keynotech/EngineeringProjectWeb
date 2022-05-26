/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import TaskMenu from "./TaskMenu"
import useGroupBy from "../../../hooks/filters/useGroupBy/useGroupBy"

const Button = styled.button`
  padding: 8px 6px;
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
        >
          {group.name}
        </Button>
      ))}
    </TaskMenu>
  )
}

export default GroupController
