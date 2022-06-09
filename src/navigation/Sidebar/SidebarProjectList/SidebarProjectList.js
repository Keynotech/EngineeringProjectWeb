/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import {
  showFolderInput,
  showProjectInput,
} from "../../../store/features/layoutSlice"

import useProjectsQuery from "../../../hooks/query/useProjectsQuery"
import useFoldersQuery from "../../../hooks/query/useFoldersQuery"
import SidebarItem from "../SidebarItem"
import { DropdownItemMenu } from "../../../components/DropdownMenu"
import useGroupByFolders from "./useGroupByFolders"
import ListSection from "./ListSection"

const Wrapper = styled.div`
  margin-top: 30px;
`

function SidebarProjectList() {
  const { t } = useTranslation()

  // Query
  // ===========================================================================
  const projects = useProjectsQuery()
  const folders = useFoldersQuery()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showProjectInput = () => dispatch(showProjectInput())
  const _showFolderInput = () => dispatch(showFolderInput())

  // Locale State
  // ===========================================================================
  const [sections, setSections] = useState([])

  useEffect(() => {
    if (folders.isSuccess && projects.isSuccess) {
      const foldersData = folders.data
      const projectsData = projects.data
      const sectionedDate = useGroupByFolders(foldersData, projectsData)
      setSections(sectionedDate)
    }
  }, [folders.data, projects.data])

  return (
    <Wrapper>
      {sections.length
        ? sections.map((section) => (
            <ListSection key={section.key} section={section} />
          ))
        : null}
      <SidebarItem
        as="div"
        icon={<AddIcon fontSize="inherit" />}
        name={t("project.create")}
        fontWeight="light"
        onClick={_showProjectInput}
        clickable
        key="project.create"
      />
    </Wrapper>
  )
}

export default SidebarProjectList
