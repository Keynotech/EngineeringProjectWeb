/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import styled, { css } from "styled-components"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import {
  DropdownMenu,
  DropdownItemMenu,
} from "../../../components/DropdownMenu"
import useSingleProjectQuery from "../../../hooks/query/useSingleProjectQuery"
import useDeleteProject from "../../../hooks/mutation/useDeleteProject"
import {
  showProjectEdit,
  setProjectEditId,
} from "../../../store/features/projectEditPageSlice"

const Wrapper = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  max-height: 24px;
  margin-right: 8px;
`

const Icon = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.theme.tertiary};
`

const Title = styled.span`
  flex: 1;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  max-height: 24px;
  opacity: 0;
  transition: opacity 0.5s;

  ${({ displayMenu }) =>
    displayMenu &&
    css`
      opacity: 1;
    `}
`

function ProjectItem({ projectId, showMenu }) {
  const [displayMenuBtn, toggleDisplayMenuBtn] = useState(false)
  const [menuIsOpen, toggleMenu] = useState(false)
  const project = useSingleProjectQuery(projectId)
  const deleteProjectMutation = useDeleteProject()
  const deleteProject = () => deleteProjectMutation.mutate(projectId)

  const dispatch = useDispatch()
  const _showProjectEdit = () => {
    dispatch(showProjectEdit())
  }

  const _setProjectEditId = () => {
    dispatch(setProjectEditId(projectId))
  }

  const openProjectEdit = () => {
    _setProjectEditId()
    _showProjectEdit()
  }

  return (
    <Wrapper
      onMouseEnter={() => toggleDisplayMenuBtn(true)}
      onMouseLeave={() => {
        toggleMenu(false)
        toggleDisplayMenuBtn(false)
      }}
    >
      <IconWrapper>
        <Icon />
      </IconWrapper>
      <Title>{project ? project.projectName : ""}</Title>
      {showMenu ? (
        <Menu displayMenu={displayMenuBtn}>
          <DropdownMenu
            outsideClick={() => toggleMenu(false)}
            isOpen={menuIsOpen}
            toggle={
              <MoreHorizIcon
                color="inherit"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => toggleMenu(!menuIsOpen)}
              />
            }
          >
            <DropdownItemMenu
              leftIcon={<EditOutlinedIcon color="inherit" fontSize="inehrit" />}
              label="Edit project"
              onClick={openProjectEdit}
            />
            <DropdownItemMenu
              leftIcon={
                <DeleteOutlineOutlinedIcon color="inherit" fontSize="inehrit" />
              }
              label="Delete project"
              onClick={deleteProject}
            />
          </DropdownMenu>
        </Menu>
      ) : null}
    </Wrapper>
  )
}

export default ProjectItem
