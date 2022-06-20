/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import { useQueryClient } from "react-query"
import Checkbox from "../../../components/button/Checkbox"
import TagItem from "../../Tag/TagItem/TagItem"
import { showTagInput } from "../../../store/features/layoutSlice"
import TagPropertie from "../../Propertie/TagPropertie/TagPropertie"
import Popover from "../../../components/Popover/Popover"
import useIsOpen from "../../../hooks/useIsOpen"
import PickerItem from "../PickerItem"

const Wrapper = styled.div`
  min-width: 200px;
  max-width: 90vw;
  max-height: 50vh;
  overflow-y: auto;
`

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  cursor: pointer;
  padding-right: 6px;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const WrapperTagPropertie = styled.div`
  width: 95%;
  padding-right: 8px;
`

function TagPicker({ value, currentTags, onChange, variant }) {
  // Query
  // ===========================================================================
  const queryClient = useQueryClient()
  const tags = queryClient.getQueryData(["tags"])

  // State hooks
  // ===========================================================================
  const [selectedTags, setSelectedTags] = useState([])
  const { isOpen, hide, show } = useIsOpen()
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (event) => {
    setSelectedTags([...currentTags] || [])
    setAnchorEl(event.currentTarget)
    show()
  }

  const handleClose = () => {
    onChange(selectedTags)
    setAnchorEl(null)
    hide()
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

  const { t } = useTranslation()

  return (
    <>
      <TagPropertie onClick={togglePopover} variant={variant} value={value} />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          {tags
            ? tags.map((tag) => (
                <ItemWrapper
                  onClick={() => handleChange(tag._id)}
                  key={tag._id}
                >
                  <WrapperTagPropertie>
                    <TagItem tag={tag} />
                  </WrapperTagPropertie>
                  <Checkbox
                    id="tag-picker-select"
                    onChange={() => handleChange(tag._id)}
                    checked={selectedTags.indexOf(tag._id) > -1}
                  />
                </ItemWrapper>
              ))
            : null}
          <PickerItem
            onClick={() => {
              _showTagInput()
              hide()
            }}
            icon={<AddIcon fontSize="inherit" />}
            name={t("tags.create")}
          />
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
