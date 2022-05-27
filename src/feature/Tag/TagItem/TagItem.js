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
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"
import useDeleteTag from "../../../hooks/mutation/useDeleteTag"
import {
  showTagEdit,
  setTagEditId,
} from "../../../store/features/tagEditPageSlice"

const Wrapper = styled.div`
  display: flex;
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
  const deleteTagMutation = useDeleteTag()
  const deleteTag = () => deleteTagMutation.mutate(tagId)

  const dispatch = useDispatch()
  const _showTagEdit = () => {
    dispatch(showTagEdit())
  }

  const _setTagEditId = () => {
    dispatch(setTagEditId(tagId))
  }

  const openTagEdit = () => {
    _setTagEditId()
    _showTagEdit()
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
      <Title>{tag ? tag.tagName : ""}</Title>
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
              label="Edit tag"
              onClick={openTagEdit}
            />
            <DropdownItemMenu
              leftIcon={
                <DeleteOutlineOutlinedIcon color="inherit" fontSize="inehrit" />
              }
              label="Delete tag"
              onClick={deleteTag}
            />
          </DropdownMenu>
        </Menu>
      ) : null}
    </Wrapper>
  )
}

export default TagItem
