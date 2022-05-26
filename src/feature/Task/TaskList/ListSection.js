/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"
import { AnimatePresence } from "framer-motion"
import TaskItem from "../TaskItem/TaskItem"

const SectionTitle = styled.h2`
  font-size: 14px;
`

function ListSection({ title, array }) {
  let sectionName = null
  if (title) {
    sectionName = <h4>{title}</h4>
  }

  return (
    <section>
      <SectionTitle>{sectionName}</SectionTitle>
      <AnimatePresence>
        {array?.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </AnimatePresence>
    </section>
  )
}

export default ListSection
