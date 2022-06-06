/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import Checkbox from "../../../components/button/Checkbox"
import TagItem from "../../Tag/TagItem/TagItem"
import useTagsQuery from "../../../hooks/query/useTagsQuery"
import { showTagInput } from "../../../store/features/layoutSlice"
import TagPropertie from "../../Propertie/TagPropertie/TagPropertie"
import Popover from "../../../components/Popover/Popover"

const Wrapper = styled.ul`
  min-width: 200px;
  max-width: 100vw;
`

const Item = styled.div`
  display: flex;
  width: 100%;
  overflow: visible;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 8px 12px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const AddNewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function TagPicker({ value, currentTags, onChange, variant }) {
  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  // State hooks
  // ===========================================================================
  const [selectedTags, setSelectedTags] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (event) => {
    setSelectedTags([...currentTags] || [])
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const handleClose = () => {
    onChange(selectedTags)
    setAnchorEl(null)
    setIsOpen(false)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose(e)
    } else {
      handleOpen(e)
    }
  }

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

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTagInput = () => dispatch(showTagInput())

  return (
    <>
      <TagPropertie onClick={togglePopover} variant={variant} value={value} />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          {tags.isSuccess
            ? tags.data.map((tag) => (
                <Item onClick={() => handleChange(tag._id)} key={tag._id}>
                  <TagItem showMenu={false} tagId={tag._id} />
                  <Checkbox
                    id="tag-picker-select"
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
        </Wrapper>
      </Popover>
    </>
  )
}

TagPicker.propTypes = {
  currentTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
}

export default React.memo(TagPicker)
