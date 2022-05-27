/* eslint-disable react/require-default-props */
import React, { useState } from "react"
import OutsideClickHandler from "react-outside-click-handler"
import styled, { css } from "styled-components"
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import PropTypes from "prop-types"
import ProjectItem from "../../Project/ProjectItem/ProjectItem"
import useProjectsQuery from "../../../hooks/query/useProjectsQuery"
import { showProjectInput } from "../../../store/features/layoutSlice"
import ProjectPropertie from "./ProjectPropertie"
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

  ${({ isActive }) =>
    isActive &&
    css`
      background-color: ${(props) => props.theme.secondary};
    `};
`

const AddNewTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProjectPicker({
  value,
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
  const projects = useProjectsQuery()

  // Refs
  // ===========================================================================

  // State hooks
  // ===========================================================================
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)

  // Handlers
  // ===========================================================================
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
    setIsOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
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

  return (
    <OutsideClickHandler
      useCapture={useCapture}
      disabled={!isOpen}
      onOutsideClick={handleClose}
    >
      <ProjectPropertie
        value={value}
        onClick={togglePopover}
        displayIcon={displayIcon}
        displayValue={displayValue}
        iconSize={iconSize}
        backgroundColor={backgroundColor}
        border={border}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl}>
        <Wrapper>
          <Item
            isActive={value === null || false}
            onClick={() => {
              onChange(null)
              setIsOpen(false)
            }}
          >
            <InboxOutlinedIcon sx={{ fontSize: "14px" }} />
            <span style={{ flex: 1, textAlign: "left" }}>Inbox</span>
          </Item>
          {projects.isSuccess
            ? projects.data.map((project) => (
                <Item
                  isActive={project._id === value || false}
                  onClick={() => {
                    onChange(project._id)
                    setIsOpen(false)
                  }}
                  key={project._id}
                >
                  <ProjectItem showMenu={false} projectId={project._id} />
                </Item>
              ))
            : null}
          <Item onClick={_showProjectInput}>
            <AddNewTag>
              <AddIcon
                sx={{
                  fontSize: "18px",
                  marginLeft: "-2px",
                  marginRight: "12px",
                }}
              />
              Create new project
            </AddNewTag>
          </Item>
        </Wrapper>
      </Popover>
    </OutsideClickHandler>
  )
}

ProjectPicker.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  useCapture: PropTypes.bool,
  displayIcon: PropTypes.bool,
  displayValue: PropTypes.bool,
  iconSize: PropTypes.number,
  backgroundColor: PropTypes.string,
  border: PropTypes.string,
}

ProjectPicker.defaultProps = {
  useCapture: false,
}

export default React.memo(ProjectPicker)
