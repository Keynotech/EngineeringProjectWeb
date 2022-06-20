/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import FolderIcon from "@mui/icons-material/Folder"

const Wrapper = styled.div`
  padding: 10px 8px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`

const IconWrapper = styled.div`
  display: flex;
  height: 22px;
  min-width: 42px;
  align-items: center;
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

function FolderItem({ folder, icon }) {
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
