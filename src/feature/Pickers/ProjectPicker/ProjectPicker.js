/* eslint-disable react/require-default-props */
import React, { useState } from "react"
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

const Wrapper = styled.div`
  min-width: 200px;
  max-width: 90vw;
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 12px;

  &:hover {
    background-color: ${(props) => props.theme.secondary};
  }
`

const ItemWrapper = styled.div`
  width: 100%;
  padding: 8px 12px;
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

function ProjectPicker({ value, onChange, variant }) {
  // Query
  // ===========================================================================
  const projects = useProjectsQuery()

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
    <>
      <ProjectPropertie
        value={value}
        onClick={togglePopover}
        variant={variant}
      />
      <Popover isOpen={isOpen} anchorEl={anchorEl} onOutsideClick={handleClose}>
        <Wrapper>
          <Item
            isActive={value === null || false}
            onClick={() => {
              onChange(null)
              setIsOpen(false)
            }}
          >
            <InboxOutlinedIcon
              sx={{
                fontSize: "18px",
                marginLeft: "-2px",
                marginRight: "12px",
              }}
            />
            <span style={{ flex: 1, textAlign: "left" }}>Inbox</span>
          </Item>
          {projects.isSuccess
            ? projects.data.map((project) => (
                <ItemWrapper
                  isActive={project._id === value || false}
                  onClick={() => {
                    onChange(project._id)
                    setIsOpen(false)
                  }}
                  key={project._id}
                >
                  <ProjectItem projectId={project._id} />
                </ItemWrapper>
              ))
            : null}
          <Item onClick={_showProjectInput}>
            <AddIcon
              sx={{
                fontSize: "18px",
                marginLeft: "-2px",
                marginRight: "12px",
              }}
            />
            Create new project
          </Item>
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
