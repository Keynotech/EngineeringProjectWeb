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

const Wrapper = styled.div`
  min-width: 200px;
  max-width: 90vw;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const WrapperTagPropertie = styled.div`
  width: 95%;
  padding-right: 8px;
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
                <ItemWrapper
                  onClick={() => handleChange(tag._id)}
                  key={tag._id}
                >
                  <WrapperTagPropertie>
                    <TagItem showMenu={false} tagId={tag._id} />
                  </WrapperTagPropertie>
                  <Checkbox
                    id="tag-picker-select"
                    onChange={() => handleChange(tag._id)}
                    checked={selectedTags.indexOf(tag._id) > -1}
                  />
                </ItemWrapper>
              ))
            : null}
          <ItemWrapper onClick={_showTagInput}>
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
          </ItemWrapper>
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
