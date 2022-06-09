/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from "react-router-dom"
import FolderIcon from "@mui/icons-material/Folder"
import FolderOpenIcon from "@mui/icons-material/FolderOpen"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"
import {
  showProjectEdit,
  setProjectEditId,
} from "../../../store/features/projectEditPageSlice"
import useDeleteProject from "../../../hooks/mutation/useDeleteProject"
import useDeleteFolder from "../../../hooks/mutation/useDeleteFolder"
import SidebarList from "../SidebarList"
import SidebarLink from "../SidebarLink"
import SidebarItem from "../SidebarItem"
import { DropdownItemMenu } from "../../../components/DropdownMenu"

const Wrapper = styled.div`
  width: 100%;
`

const ProjectIcon = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.textTertiary};
`

function ListSection({ section }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showProjectEdit = () => dispatch(showProjectEdit())
  const _setProjectEditId = (projectId) => dispatch(setProjectEditId(projectId))

  const openProjectEdit = (projectId) => {
    _setProjectEditId(projectId)
    _showProjectEdit()
  }
  // Mutations
  // ===========================================================================
  const deleteProjectMutation = useDeleteProject()
  const deleteProject = (projectId) => {
    deleteProjectMutation.mutate(projectId)
    const currentLocation = location.pathname.split("/")

    if (currentLocation[2] === projectId) {
      navigate("inbox")
    }
  }

  const deleteFolderMutation = useDeleteFolder()
  const deleteFolder = (folderId) => {
    deleteFolderMutation.mutate(folderId)
  }

  // Locale State
  // ===========================================================================
  const [isOpen, toggleIsOpen] = useState(false)

  useEffect(() => {
    if (section.key === null) {
      toggleIsOpen(true)
    }
  }, [section.key])

  let folderName = null
  if (section.key) {
    folderName = (
      <SidebarItem
        as="div"
        icon={
          isOpen ? (
            <FolderOpenIcon fontSize="inherit" />
          ) : (
            <FolderIcon fontSize="inherit" />
          )
        }
        name={section.name}
        fontWeight="light"
        key={section.key}
        onClick={() => toggleIsOpen(!isOpen)}
        menuContent={
          <DropdownItemMenu
            leftIcon={
              <DeleteOutlineOutlinedIcon color="inherit" fontSize="inehrit" />
            }
            label={t("folders.delete")}
            onClick={() => deleteFolder(section.key)}
          />
        }
      />
    )
  }

  let projectList = null
  if (section.key === null) {
    projectList = (
      <SidebarList style={{ marginBottom: "20px" }}>
        <AnimatePresence>
          {section.array.map((project) => (
            <motion.div
              key={project._id}
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 200, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <SidebarLink
                icon={<ProjectIcon />}
                name={project.projectName}
                route={`project/${project._id}`}
                fontWeight="light"
                menuContent={
                  <>
                    <DropdownItemMenu
                      leftIcon={
                        <EditOutlinedIcon color="inherit" fontSize="inehrit" />
                      }
                      label={t("project.edit")}
                      onClick={() => {
                        openProjectEdit(project._id)
                      }}
                    />
                    <DropdownItemMenu
                      leftIcon={
                        <DeleteOutlineOutlinedIcon
                          color="inherit"
                          fontSize="inehrit"
                        />
                      }
                      label={t("project.delete")}
                      onClick={() => deleteProject(project._id)}
                    />
                  </>
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </SidebarList>
    )
  } else {
    projectList = (
      <SidebarList>
        {isOpen ? (
          <AnimatePresence>
            {section.array.map((project) => (
              <motion.div
                key={project._id}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SidebarLink
                  icon={<ProjectIcon />}
                  name={project.projectName}
                  route={`project/${project._id}`}
                  fontWeight="light"
                  menuContent={
                    <>
                      <DropdownItemMenu
                        leftIcon={
                          <EditOutlinedIcon
                            color="inherit"
                            fontSize="inehrit"
                          />
                        }
                        label={t("project.edit")}
                        onClick={() => {
                          openProjectEdit(project._id)
                        }}
                      />
                      <DropdownItemMenu
                        leftIcon={
                          <DeleteOutlineOutlinedIcon
                            color="inherit"
                            fontSize="inehrit"
                          />
                        }
                        label={t("project.delete")}
                        onClick={() => deleteProject(project._id)}
                      />
                    </>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : null}
      </SidebarList>
    )
  }

  return (
    <Wrapper>
      {folderName}
      {projectList}
    </Wrapper>
  )
}

export default ListSection
