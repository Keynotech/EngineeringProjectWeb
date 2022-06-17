/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react"
import { AnimatePresence } from "framer-motion"
import styled from "styled-components"
import useDeleteFile from "../../hooks/mutation/useDeleteFile"
import AttachmentItem from "./AttachmentItem"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  gap: 8px;
  width: 100%;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`

function AttachmentList({ attachments, taskId, openUpload }) {
  const deleleFileMutation = useDeleteFile(taskId)
  const deleteFile = (fileId) => deleleFileMutation.mutate(fileId)

  if (!attachments) {
    return null
  }

  return (
    <Wrapper>
      <AnimatePresence>
        <AttachmentItem uploadFunc={openUpload} />
        {attachments.map((attachment) => (
          <AttachmentItem
            key={attachment._id}
            id={attachment._id}
            name={attachment.file[0].originalname}
            deleteFunc={() => deleteFile(attachment._id)}
          />
        ))}
      </AnimatePresence>
    </Wrapper>
  )
}

export default AttachmentList
