/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import Checkbox from "../../button/Checkbox"
import TagItem from "../../../feature/Tag/TagItem"
import { useTagsQuery } from "../../../api/api"
import { showTagInput } from "../../../store/features/layoutSlice"
import Propertie from "../Propertie"
import Dropdown from "../../Dropdown/Dropdown"

export const Item = styled.div`
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;

  &:hover {
    background-color: ${(props) => props.theme.primary};
  }
`

export const AddNewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  min-height: 24px;
`

function TagPicker({ currentTags, onChange }) {
  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  // Locale state
  // ===========================================================================
  const [selectedTags, setSelectedTags] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (id) => {
    const index = selectedTags.findIndex((elem) => elem === id, id)
    if (index > -1) {
      setSelectedTags([
        ...selectedTags.slice(0, index),
        ...selectedTags.slice(index + 1),
      ])
    } else {
      setSelectedTags([...selectedTags, id])
    }
  }
  // Hooks
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTagInput = () => dispatch(showTagInput())
  const wrapperRef = useRef()

  // Hooks
  // ===========================================================================

  const toggleIsOpen = () => {
    if (isOpen === false) {
      currentTags ? setSelectedTags([...currentTags]) : setSelectedTags([])
      setIsOpen(true)
    } else {
      setIsOpen(false)
      onChange(selectedTags)
    }
  }

  return (
    <>
      <Propertie
        onClick={() => toggleIsOpen()}
        icon={<LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />}
        value="Add tag"
      />
      <Dropdown isOpen={isOpen}>
        {tags.isSuccess
          ? tags.data.map((tag) => (
              <Item onChange={() => handleChange(tag._id)} key={tag._id}>
                <TagItem tagId={tag._id} />
                <Checkbox
                  onChange={() => handleChange(tag._id)}
                  checked={selectedTags.indexOf(tag._id) > -1}
                />
              </Item>
            ))
          : null}
        <Item onClick={_showTagInput}>
          <AddNewTag>
            <AddIcon
              sx={{
                fontSize: "18px",
                marginLeft: "-2px",
                marginRight: "16px",
              }}
            />
            Create new tag
          </AddNewTag>
        </Item>
      </Dropdown>
    </>
  )
}

export default React.memo(TagPicker)
