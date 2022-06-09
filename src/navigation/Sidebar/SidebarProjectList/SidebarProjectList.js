/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import useProjectsQuery from "../../../hooks/query/useProjectsQuery"
import useFoldersQuery from "../../../hooks/query/useFoldersQuery"
import useGroupByFolders from "./useGroupByFolders"
import ListSection from "./ListSection"
import NewListMenu from "./NewListMenu"

const Wrapper = styled.div`
  margin-top: 30px;
`

function SidebarProjectList() {
  // Query
  // ===========================================================================
  const projects = useProjectsQuery()
  const folders = useFoldersQuery()

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
      <NewListMenu />
    </Wrapper>
  )
}

export default SidebarProjectList
