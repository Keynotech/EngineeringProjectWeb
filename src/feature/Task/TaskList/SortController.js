/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"
import styled from "styled-components"
import TaskMenu from "./TaskMenu/TaskMenu"
import Item from "./TaskMenu/Item"
import useSort from "../../../hooks/filters/useSort"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const List = styled.div`
  display: inline-flex;
  gap: 14px;
`

const Button = styled.button`
  padding: 8px 6px;
  background-color: ${(props) => props.theme.tertiary};
`

function SortController({ data, onSortChange, sortOptions }) {
  const { handleDirectionToggle, handleSortKeyChange, sortDirection, sortKey } =
    useSort({ data, sortOptions, onSortChange })

  return (
    <Wrapper>
      <List>
        {sortOptions.map((sort) => (
          <div key={sort.name}>
            <Button
              type="button"
              onClick={() => handleSortKeyChange(sort.key, sort.type)}
            >
              {sort.name}
            </Button>
          </div>
        ))}
        <div>Current sort key: {sortKey}</div>
      </List>
      <List>
        <Button type="button" onClick={handleDirectionToggle}>
          Change sort dir
        </Button>
        <div>Current sort order: {sortDirection}</div>
      </List>
    </Wrapper>
  )
}

export default SortController
