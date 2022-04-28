/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined"
import Select from "@mui/material/Select"
import {
  Wrapper,
  DropDownWrapper,
  DropDownContainer,
  Propertie,
  PropertieValue,
} from "./TagPicker.style"
import TagItem from "../../item/TagItem/TagItem"
import { useTagsQuery } from "../../../app/api/api"

function TagPicker({ currentValue, onClose }) {
  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  // Locale state
  // ===========================================================================
  const [selectedTags, setSelectedTags] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event
    setSelectedTags(value)
  }

  // Hooks
  // ===========================================================================
  useEffect(() => {
    if (isOpen === false) {
      onClose(selectedTags)
      setSelectedTags([])
    }
    if (isOpen === true) {
      currentValue ? setSelectedTags([...currentValue]) : setSelectedTags([])
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
          <Select
            labelId="label"
            id="select"
            onChange={handleChange}
            value={selectedTags}
            multiple
          >
            {tags.data.map((tag) => (
              <TagItem key={tag._id} tag={tag} />
            ))}
          </Select>
        </DropDownContainer>
      </DropDownWrapper>
    </Wrapper>
  )
}

export default TagPicker
