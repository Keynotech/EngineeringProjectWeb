/* eslint-disable react/require-default-props */
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import { useQueryClient } from "react-query"
import { showFolderInput } from "../../../store/features/layoutSlice"
import FolderPropertie from "../../Propertie/FolderPropertie/FolderPropertie"
import Popover from "../../../components/Popover/Popover"
import useIsOpen from "../../../hooks/useIsOpen"
import SingleItem from "../../../components/SingleItem/SingleItem"

const Wrapper = styled.div`
  width: min(290px, 90vw);
  max-height: 50vh;
  overflow-y: auto;
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
          <SingleItem
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
                <SingleItem
                  name={folder.folderName}
                  isActive={folder._id === value || false}
                  onClick={() => {
                    onChange(folder._id)
                    hide()
                  }}
                  key={folder._id}
                />
              ))
            : null}

          <SingleItem
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
