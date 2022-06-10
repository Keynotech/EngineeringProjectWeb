import React from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"
import styled from "styled-components"
import AddIcon from "@mui/icons-material/Add"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import { showTagInput } from "../../store/features/layoutSlice"
import {
  showTagEdit,
  setTagEditId,
} from "../../store/features/tagEditPageSlice"

import useTagsQuery from "../../hooks/query/useTagsQuery"
import useDeleteTag from "../../hooks/mutation/useDeleteTag"
import SidebarSectionHeader from "./SidebarSectionHeader"
import SidebarList from "./SidebarList"
import SidebarLink from "./SidebarLink"
import SidebarItem from "./SidebarItem"
import { DropdownItemMenu } from "../../components/DropdownMenu"

const TagsWrapper = styled.div`
  margin-top: 20px;
`

const TagColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.color || props.theme.tertiary};
`

function SidebarTagList() {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()
  // Query
  // ===========================================================================
  const tags = useTagsQuery()

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTagInput = () => dispatch(showTagInput())
  const _showTagEdit = () => dispatch(showTagEdit())
  const _setTagEditId = (tagId) => dispatch(setTagEditId(tagId))

  const openTagEdit = (tagId) => {
    _setTagEditId(tagId)
    _showTagEdit()
  }

  // Mutations
  // ===========================================================================
  const deleteTagMutation = useDeleteTag()
  const deleteTag = (tagId) => {
    deleteTagMutation.mutate(tagId)
    const currentLocation = location.pathname.split("/")

    if (currentLocation[2] === tagId) {
      navigate("inbox")
    }
  }

  return (
    <TagsWrapper>
      <SidebarSectionHeader name={t("sidebar.tags")} />

      {tags.isSuccess ? (
        <SidebarList>
          <AnimatePresence>
            {tags.data.map((tag) => (
              <motion.div
                key={tag._id}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SidebarLink
                  icon={<TagColor color={tag.color} />}
                  name={tag.tagName}
                  route={`tag/${tag._id}`}
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
                        label={t("tags.edit")}
                        onClick={() => openTagEdit(tag._id)}
                      />
                      <DropdownItemMenu
                        leftIcon={
                          <DeleteOutlineOutlinedIcon
                            color="inherit"
                            fontSize="inehrit"
                          />
                        }
                        label={t("tags.delete")}
                        onClick={() => deleteTag(tag._id)}
                      />
                    </>
                  }
                />
              </motion.div>
            ))}

            <SidebarItem
              as="div"
              icon={<AddIcon fontSize="inherit" />}
              name={t("tags.create")}
              fontWeight="light"
              onClick={_showTagInput}
              clickable
            />
          </AnimatePresence>
        </SidebarList>
      ) : null}
    </TagsWrapper>
  )
}

export default SidebarTagList
