/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */

import React from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import { showTagInput } from "../../../app/store/features/layoutSlice"
import TagItem from "../../item/Tag/TagItem"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  li {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 4px 8px;
    border-radius: 4px;
    min-height: 24px;
    color: ${(props) => props.theme.textSecondary};

    &:hover {
      background-color: ${(props) => props.theme.secondary};
      border-radius: 4px;
    }
  }
`

function TagsList({ tags }) {
  const dispatch = useDispatch()
  const _showTagInput = () => dispatch(showTagInput())
  return (
    <Wrapper>
      <ul>
        {tags
          ? tags.data.map((tag) => <TagItem tagId={tag._id} key={tag._id} />)
          : null}
        <li onClick={_showTagInput}>
          <AddIcon
            sx={{ fontSize: "18px", marginLeft: "-2px", marginRight: "16px" }}
          />
          Create new tag
        </li>
      </ul>
    </Wrapper>
  )
}

export default TagsList
