/* eslint-disable react/prop-types */
import React from "react"
import { Tag } from "@chakra-ui/react"
import useSingleTagQuery from "../../../hooks/query/useSingleTagQuery"

function TagDisplayInTask({ tagId }) {
  const tag = useSingleTagQuery(tagId)

  return <Tag>{tag ? tag.tagName : ""}</Tag>
}

export default TagDisplayInTask
