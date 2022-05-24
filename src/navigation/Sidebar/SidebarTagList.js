import React from "react"
import { useDispatch } from "react-redux"
import { AnimatePresence, motion } from "framer-motion"
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
import SidebarItem from "./SidebarItem"
import { DropdownItemMenu } from "../../components/DropdownMenu"

const TagsWrapper = styled.div`
  margin-top: 40px;
`

const TagColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 25px;
  background-color: ${(props) => props.color || props.theme.tertiary};
`

function SidebarTagList() {
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
  const deleteTag = (tagId) => deleteTagMutation.mutate(tagId)

  return (
    <TagsWrapper>
      <SidebarSectionHeader name="Tags" />

      {tags.isSuccess ? (
        <AnimatePresence>
          <SidebarList>
            {tags.data.map((tag) => (
              <motion.div
                key={tag._id}
                initial={{ x: 200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 200, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SidebarItem
                  as="div"
                  icon={<TagColor color={tag.color} />}
                  name={tag.tagName}
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
                        label="Edit tag"
                        onClick={() => openTagEdit(tag._id)}
                      />
                      <DropdownItemMenu
                        leftIcon={
                          <DeleteOutlineOutlinedIcon
                            color="inherit"
                            fontSize="inehrit"
                          />
                        }
                        label="Delete tag"
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
              name="Create new tag"
              fontWeight="light"
              onClick={_showTagInput}
            />
          </SidebarList>
        </AnimatePresence>
      ) : null}
    </TagsWrapper>
  )
}

export default SidebarTagList
