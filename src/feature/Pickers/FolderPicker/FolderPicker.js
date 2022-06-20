/* eslint-disable react/require-default-props */
import React from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import { useQueryClient } from "react-query"
import FolderItem from "../../Folder/FolderItem/FolderItem"
import { showFolderInput } from "../../../store/features/layoutSlice"
import FolderPropertie from "../../Propertie/FolderPropertie/FolderPropertie"
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
  justify-content: flex-start;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${(props) => props.theme.secondary};
    `};
`

function FolderPicker({ value, onChange, variant }) {
  // Query
  // ===========================================================================
  const queryClient = useQueryClient()
  const folders = queryClient.getQueryData(["folders"])

  // State hooks
  // ===========================================================================
  const { isOpen, hide, show } = useIsOpen()
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    show()
  }

  const handleClose = () => {
    setAnchorEl(null)
    hide()
  }

  const togglePopover = (e) => {
    if (isOpen) {
      handleClose()
    } else {
      handleOpen(e)
    }
  }

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showFolderInput = () => dispatch(showFolderInput())

  const { t } = useTranslation()

  return (
    <>
      <FolderPropertie
        value={value}
        onClick={togglePopover}
        variant={variant}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          <PickerItem
            icon={<DoNotDisturbIcon fontSize="inherit" />}
            isActive={value === null || false}
            onClick={() => {
              onChange(null)
              hide()
            }}
            name={t("picker.folder.none")}
          />
          {folders
            ? folders.map((folder) => (
                <ItemWrapper
                  isActive={folder._id === value || false}
                  onClick={() => {
                    onChange(folder._id)
                    hide()
                  }}
                  key={folder._id}
                >
                  <FolderItem folder={folder} />
                </ItemWrapper>
              ))
            : null}

          <PickerItem
            onClick={() => {
              _showFolderInput()
              hide()
            }}
            icon={<AddIcon fontSize="inherit" />}
            name={t("folders.create")}
          />
        </Wrapper>
      </Popover>
    </>
  )
}

FolderPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
}

export default React.memo(FolderPicker)
