/* eslint-disable react/prop-types */
import React, { useState } from "react"
import styled, { css } from "styled-components"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import FolderIcon from "@mui/icons-material/Folder"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import {
  DropdownMenu,
  DropdownItemMenu,
} from "../../../components/DropdownMenu"
import useSingleFolderQuery from "../../../hooks/query/useSingleFolderQuery"
import useDeleteProject from "../../../hooks/mutation/useDeleteProject"

const Wrapper = styled.div`
  display: flex;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  max-height: 24px;
  margin-right: 8px;
  font-size: 16px;
  color: ${(props) => props.theme.textTertiary};
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

function FolderItem({ folderId, showMenu, icon }) {
  const [displayMenuBtn, toggleDisplayMenuBtn] = useState(false)
  const [menuIsOpen, toggleMenu] = useState(false)
  const folder = useSingleFolderQuery(folderId)
  const deleteProjectMutation = useDeleteProject()
  const deleteProject = () => deleteProjectMutation.mutate(folderId)

  return (
    <Wrapper
      onMouseEnter={() => toggleDisplayMenuBtn(true)}
      onMouseLeave={() => {
        toggleMenu(false)
        toggleDisplayMenuBtn(false)
      }}
    >
      <IconWrapper>
        {icon ? { icon } : <FolderIcon color="inherit" fontSize="inherit" />}
      </IconWrapper>
      <Title>{folder ? folder.folderName : ""}</Title>
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

export default FolderItem
