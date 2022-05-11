/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */

import React, { useState, useImperativeHandle, forwardRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDropzone } from "react-dropzone"
import { onDragLeave } from "../../../store/features/windowDragEnterSlice"
import { Wrapper, Container, Title, SubTitle } from "./FileUpload.style"
import useUploadFile from "../../../hooks/mutation/useUploadFile"
import uploadImage from "../../../assets/images/undraw_add_files_re_v09g.svg"
import useWindowDragDetect from "../../../hooks/useWindowDragDetect"

function FileUpload(props, ref) {
  const { taskId } = props
  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _onDragLeave = () => dispatch(onDragLeave())

  // Mutations
  // ===========================================================================
  const uploadFileMutate = useUploadFile(taskId)
  const uploadFile = (files) => uploadFileMutate.mutate(files)

  // Local State & Selectors
  // ===========================================================================
  const isDragEnter = useSelector((state) => state.windowDragEnter.isDragEnter)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragEnter = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }
  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  // Hooks
  // ===========================================================================
  const windowDragDetect = useWindowDragDetect()
  const { getRootProps, open } = useDropzone({
    onDrop: (acceptedFiles) => {
      const formData = new FormData()
      acceptedFiles.forEach((file) => {
        formData.append("file", file)
      })
      uploadFile(formData)
      _onDragLeave()
    },
    maxFiles: 3,
  })

  // Handle Refs
  // ===========================================================================

  useImperativeHandle(ref, () => ({
    openUpload: () => open(),
  }))

  return (
    <Wrapper
      {...getRootProps({ className: "dropzone" })}
      isActive={isDragEnter}
      isDragOver={isDragOver}
    >
      <Container
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        isActive={isDragEnter}
      >
        <img src={uploadImage} alt="upload file" />
        <Title>Add files</Title>
        <SubTitle> Drop files here to add them to task</SubTitle>
      </Container>
    </Wrapper>
  )
}

export default forwardRef(FileUpload)
