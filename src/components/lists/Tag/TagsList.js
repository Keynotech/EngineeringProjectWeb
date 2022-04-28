/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from "react"
import styled from "styled-components"
import TagItem from "../../item/TagItem/TagItem"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  li {
    &:hover {
      background-color: ${(props) => props.theme.secondary};
      border-radius: 4px;
    }
  }
`

function TagsList({ tags }) {
  return (
    <Wrapper>
      <ul>
        {tags
          ? tags.data.map((tag) => <TagItem key={tag._id} tag={tag} />)
          : null}
      </ul>
    </Wrapper>
  )
}

export default TagsList
