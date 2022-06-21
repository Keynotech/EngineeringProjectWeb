/* eslint-disable react/require-default-props */
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import useProjectsQuery from "../../../hooks/query/useProjectsQuery"
import { showProjectInput } from "../../../store/features/layoutSlice"
import ProjectPropertie from "../../Propertie/ProjectPropertie/ProjectPropertie"
import Popover from "../../../components/Popover/Popover"
import ProjectIcon from "../../Project/ProjectIcon/ProjectIcon"
import useIsOpen from "../../../hooks/useIsOpen"
import SingleItem from "../../../components/SingleItem/SingleItem"

const Wrapper = styled.div`
  width: min(290px, 90vw);
  max-height: 50vh;
  overflow-y: auto;
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
          <SingleItem
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
                <SingleItem
                  icon={<ProjectIcon />}
                  key={project._id}
                  name={project.projectName}
                  onClick={() => {
                    onChange(project._id)
                    hide()
                  }}
                  isActive={project._id === value || false}
                />
              ))
            : null}
          <SingleItem
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
