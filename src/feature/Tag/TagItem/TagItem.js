/* eslint-disable react/prop-types */
import React, { useState } from "react"
import styled, { css } from "styled-components"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditIcon from "@mui/icons-material/Edit"
import DropdownMenu from "../../../components/DropdownMenu/DropdownMenu"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"
import useDeleteTag from "../../../hooks/mutation/useDeleteTag"

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${(props) => props.theme.textSecondary};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  max-height: 24px;
  margin-right: 12px;
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

function TagItem({ tagId, showMenu }) {
  const [displayMenuBtn, toggleDisplayMenuBtn] = useState(false)
  const [menuIsOpen, toggleMenu] = useState(false)
  const tag = useSingleTagQuery(tagId)
  const deleteTagMutation = useDeleteTag(tagId)
  const deleteTag = () => deleteTagMutation.mutate()

  const menuItems = [
    {
      icon: <EditIcon color="inherit" fontSize="inehrit" />,
      title: "Edit tag",
    },
    {
      icon: <DeleteOutlineOutlinedIcon color="inherit" fontSize="inehrit" />,
      title: "Delete tag",
      onClick: deleteTag,
    },
  ]
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
      <Title>{tag ? tag.tagName : ""}</Title>
      {showMenu ? (
        <Menu displayMenu={displayMenuBtn}>
          <DropdownMenu
            isOpen={menuIsOpen}
            toggleComponent={
              <MoreHorizIcon
                color="inherit"
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => toggleMenu(!menuIsOpen)}
              />
            }
            menuItems={menuItems}
          />
        </Menu>
      ) : null}
    </Wrapper>
  )
}

export default TagItem
