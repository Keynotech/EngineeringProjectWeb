/* eslint-disable react/require-default-props */
import React from "react"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import ProjectItem from "../../Project/ProjectItem/ProjectItem"
import useProjectsQuery from "../../../hooks/query/useProjectsQuery"
import { showProjectInput } from "../../../store/features/layoutSlice"
import ProjectPropertie from "../../Propertie/ProjectPropertie/ProjectPropertie"
import Popover from "../../../components/Popover/Popover"
import useIsOpen from "../../../hooks/useIsOpen"
import PickerItem from "../PickerItem"

const Wrapper = styled.div`
  min-width: 200px;
  max-width: 90vw;
  max-height: 50vh;
  overflow-y: auto;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${(props) => props.theme.secondary};
    `};
`

function ProjectPicker({ value, onChange, variant }) {
  // Query
  // ===========================================================================
  const projects = useProjectsQuery()

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
  const _showProjectInput = () => dispatch(showProjectInput())

  const { t } = useTranslation()

  return (
    <>
      <ProjectPropertie
        value={value}
        onClick={togglePopover}
        variant={variant}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          <PickerItem
            name="Inbox"
            icon={<InboxOutlinedIcon fontSize="inherit" />}
            onClick={() => {
              onChange(null)
              hide()
            }}
            isActive={value === null || false}
          />
          {projects.isSuccess
            ? projects.data.map((project) => (
                <Item
                  isActive={project._id === value || false}
                  onClick={() => {
                    onChange(project._id)
                    hide()
                  }}
                  key={project._id}
                >
                  <ProjectItem project={project} />
                </Item>
              ))
            : null}
          <PickerItem
            name={t("project.create")}
            icon={<AddIcon fontSize="inherit" />}
            onClick={() => {
              _showProjectInput()
              hide()
            }}
          />
        </Wrapper>
      </Popover>
    </>
  )
}

ProjectPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(["icon", "standard", "medium"]),
}

export default React.memo(ProjectPicker)
