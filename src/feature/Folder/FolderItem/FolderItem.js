/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import FolderIcon from "@mui/icons-material/Folder"
import useSingleFolderQuery from "../../../hooks/query/useSingleFolderQuery"

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

function FolderItem({ folderId, icon }) {
  const folder = useSingleFolderQuery(folderId)

  return (
    <Wrapper>
      <IconWrapper>
        {icon ? { icon } : <FolderIcon color="inherit" fontSize="inherit" />}
      </IconWrapper>
      <Title>{folder ? folder.folderName : ""}</Title>
    </Wrapper>
  )
}

export default FolderItem
