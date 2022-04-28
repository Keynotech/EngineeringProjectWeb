/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import Checkbox from "../../button/Checkbox"
import {
  Wrapper,
  DropDownWrapper,
  DropDownContainer,
  DropDownItem,
  Propertie,
  PropertieValue,
  AddNewTag,
} from "./TagPicker.style"
import TagItem from "../../item/Tag/TagItem"
import { useTagsQuery } from "../../../app/api/api"
import { showTagInput } from "../../../app/store/features/layoutSlice"

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

  // Hooks
  // ===========================================================================
  useEffect(() => {
    if (isOpen === false) {
      onChange(selectedTags)
      setSelectedTags([])
    }
    if (isOpen === true) {
      currentTags ? setSelectedTags([...currentTags]) : setSelectedTags([])
    }
  }, [isOpen])

  return (
    <Wrapper>
      <Propertie id="label" onClick={() => setIsOpen(!isOpen)}>
        <LocalOfferOutlinedIcon fontSize="inherit" color="inherit" />
        <PropertieValue>Add tags</PropertieValue>
      </Propertie>
      <DropDownWrapper isOpen={isOpen}>
        <DropDownContainer>
          {tags.isSuccess
            ? tags.data.map((tag) => (
                <DropDownItem
                  onChange={() => handleChange(tag._id)}
                  key={tag._id}
                >
                  <TagItem tagId={tag._id} />
                  <Checkbox
                    onChange={() => handleChange(tag._id)}
                    checked={selectedTags.indexOf(tag._id) > -1}
                  />
                </DropDownItem>
              ))
            : null}
          <DropDownItem onClick={_showTagInput}>
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
          </DropDownItem>
        </DropDownContainer>
      </DropDownWrapper>
    </Wrapper>
  )
}

export default TagPicker
