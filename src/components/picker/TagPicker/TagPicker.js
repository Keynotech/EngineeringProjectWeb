/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import Checkbox from "../../button/Checkbox"
import {
  Wrapper,
  DropDownWrapper,
  DropDownContainer,
  DropDownItem,
  Propertie,
  PropertieValue,
} from "./TagPicker.style"
import TagItem from "../../item/TagItem/TagItem"
import { useTagsQuery } from "../../../app/api/api"

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
          {tags.data.map((tag) => (
            <DropDownItem onChange={() => handleChange(tag._id)} key={tag._id}>
              <TagItem tag={tag} />
              <Checkbox
                onChange={() => handleChange(tag._id)}
                checked={selectedTags.indexOf(tag._id) > -1}
              />
            </DropDownItem>
          ))}
        </DropDownContainer>
      </DropDownWrapper>
    </Wrapper>
  )
}

export default TagPicker
