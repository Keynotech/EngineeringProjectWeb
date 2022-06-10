import React, { useState } from "react"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import FolderIcon from "@mui/icons-material/Folder"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import SidebarItem from "../SidebarItem"
import {
  DropdownMenu,
  DropdownItemMenu,
} from "../../../components/DropdownMenu"
import {
  showFolderInput,
  showProjectInput,
} from "../../../store/features/layoutSlice"

const ProjectIcon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.textTertiary};
`

function NewListMenu() {
  const [menuIsOpen, toggleMenu] = useState(false)
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const _showProjectInput = () => dispatch(showProjectInput())
  const _showFolderInput = () => dispatch(showFolderInput())
  return (
    <DropdownMenu
      isOpen={menuIsOpen}
      outsideClick={() => toggleMenu(false)}
      toggle={
        <SidebarItem
          as="div"
          icon={<AddIcon fontSize="inherit" />}
          name="Createw new list"
          fontWeight="light"
          onClick={() => toggleMenu(!menuIsOpen)}
          clickable
          key="create-new-list"
        />
      }
    >
      <>
        <DropdownItemMenu
          label={t("project.create")}
          leftIcon={<ProjectIcon />}
          onClick={() => {
            toggleMenu(false)
            _showProjectInput()
          }}
        />
        <DropdownItemMenu
          label={t("folders.create")}
          leftIcon={<FolderIcon fontSize="inherit" />}
          onClick={() => {
            toggleMenu(false)
            _showFolderInput()
          }}
        />
      </>
    </DropdownMenu>
  )
}

export default NewListMenu
