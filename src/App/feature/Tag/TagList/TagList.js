/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import TagItem from "../TagItem/TagItem"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  li {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 5px 15px 5px 20px;
    color: ${(props) => props.theme.textSecondary};

    transition: background-color 0.25s ease-in;

    &:hover {
      background-color: ${(props) => props.theme.tertiary};
    }

    &.active {
      background-color: ${(props) => props.theme.tertiary};
    }
  }
`

function TagList({ tags }) {
  return (
    <Wrapper>
      <ul>
        {tags.isSuccess
          ? tags.data.map((tag) => (
              <TagItem showMenu tagId={tag._id} key={tag._id} />
            ))
          : null}
      </ul>
    </Wrapper>
  )
}

export default TagList
