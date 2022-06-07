import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { useNavigate, useLocation } from "react-router-dom"
import { showProjectInput } from "../../store/features/layoutSlice"
import {
  showProjectEdit,
  setProjectEditId,
} from "../../store/features/projectEditPageSlice"
import useProjectsQuery from "../../hooks/query/useProjectsQuery"
import useDeleteProject from "../../hooks/mutation/useDeleteProject"
import SidebarSectionHeader from "./SidebarSectionHeader"
import SidebarList from "./SidebarList"
import SidebarLink from "./SidebarLink"
import SidebarItem from "./SidebarItem"
import { DropdownItemMenu } from "../../components/DropdownMenu"

const TagsWrapper = styled.div`
  margin-top: 30px;
`

const TagColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.color || props.theme.tertiary};
`

function SidebarProjectList() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  // Query
  // ===========================================================================
  const projects = useProjectsQuery()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showProjectInput = () => dispatch(showProjectInput())
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
    if (location.pathname === `/project/${projectId}`) {
      navigate("inbox")
    }
  }

  return (
    <TagsWrapper>
      <SidebarSectionHeader name={t("sidebar.projects")} />

      {projects.isSuccess ? (
        <SidebarList>
          <AnimatePresence>
            {projects.data.map((project) => (
              <motion.div
                key={project._id}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SidebarLink
                  icon={<TagColor color={project.color} />}
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

            <SidebarItem
              as="div"
              icon={<AddIcon fontSize="inherit" />}
              name={t("project.create")}
              fontWeight="light"
              onClick={_showProjectInput}
              clickable
            />
          </AnimatePresence>
        </SidebarList>
      ) : null}
    </TagsWrapper>
  )
}

export default SidebarProjectList
