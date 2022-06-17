/* eslint-disable react/prop-types */
import React from "react"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined"

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 12px;
  border-radius: 5px;
  border: 2px dotted ${(props) => props.theme.tertiary};
  width: 100%;
  max-width: 100%;
  height: 40px;
  margin-bottom: 8px;

  svg {
    color: ${(props) => props.theme.brandColor};
  }

  ${({ isFile }) =>
    isFile &&
    css`
      border: 1px solid ${(props) => props.theme.tertiary};
    `}
`
export const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  min-width: 100%;
  max-width: 100%;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: ${(props) => props.theme.textTertiary};

    :hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.theme.textTertiary};
    }
  }

  button {
    min-width: 70px;
  }
`

const InnerUpload = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 10px;
  min-width: 100%;
  max-width: 100%;

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    color: ${(props) => props.theme.textTertiary};

    :hover {
      text-decoration: underline;
      text-decoration-color: ${(props) => props.theme.textTertiary};
    }
  }
`

function AttachmentItem({ name, deleteFunc, uploadFunc }) {
  const { t } = useTranslation()

  if (uploadFunc) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ x: [400, -20, 0], opacity: 1, duration: 0.25 }}
        exit={{ x: 400, opacity: 0, duration: 0.2 }}
      >
        <Wrapper onClick={uploadFunc} isFile={false}>
          <InnerUpload>
            <FileUploadOutlinedIcon color="inherit" />
            <p> {t("attachments.upload")}</p>
          </InnerUpload>
        </Wrapper>
      </motion.div>
    )
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ x: [400, -20, 0], opacity: 1, duration: 0.25 }}
      exit={{ x: 400, opacity: 0, duration: 0.2 }}
    >
      <Wrapper isFile>
        <InnerWrapper>
          <p>{name}</p>
          <button type="button" onClick={deleteFunc}>
            {t("attachments.delete")}
          </button>
        </InnerWrapper>
      </Wrapper>
    </motion.div>
  )
}

export default AttachmentItem
