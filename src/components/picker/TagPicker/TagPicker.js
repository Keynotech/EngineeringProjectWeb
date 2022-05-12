/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import Checkbox from "../../button/Checkbox"
import TagItem from "../../../feature/Tag/TagItem/TagItem"
import useTagsQuery from "../../../hooks/query/useTagsQuery"
import { showTagInput } from "../../../store/features/layoutSlice"
import TagPropertie from "./TagPropertie"
import Popover from "../../Popover/Popover"

const Wrapper = styled.ul`
  min-width: 200px;
  max-width: 100vw;
`

const Item = styled.div`
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const AddNewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  min-height: 24px;
`

function TagPicker({
  currentTags,
  onChange,
  useCapture,
  displayIcon,
  displayValue,
  iconSize,
  backgroundColor,
  border,
}) {
  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  // Refs
  // ===========================================================================

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
    setAnchorEl(null)
    setIsOpen(false)
    onChange(selectedTags)
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose()
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
    <OutsideClickHandler
      useCapture={useCapture}
      disabled={!isOpen}
      onOutsideClick={handleClose}
    >
      <TagPropertie
        onClick={togglePopover}
        displayIcon={displayIcon}
        displayValue={displayValue}
        iconSize={iconSize}
        backgroundColor={backgroundColor}
        border={border}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl}>
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
    </OutsideClickHandler>
  )
}

TagPicker.propTypes = {
  currentTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  useCapture: PropTypes.bool,
  displayIcon: PropTypes.bool,
  displayValue: PropTypes.bool,
  iconSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
}

TagPicker.defaultProps = {
  useCapture: false,
}

export default React.memo(TagPicker)
