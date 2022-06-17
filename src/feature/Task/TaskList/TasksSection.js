/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import { AnimatePresence } from "framer-motion"
import TaskItem from "../TaskItem/TaskItem"

const Section = styled.section`
  padding-bottom: 20px;

  ${({ isSectionName }) =>
    isSectionName &&
    css`
      padding-top: 20px;
    `};
`

const SectionTitle = styled.h2`
  font-size: 14px;
  padding-bottom: 10px;
`

function TasksSection({ title, array }) {
  let sectionName = null
  if (title) {
    sectionName = <SectionTitle>{title}</SectionTitle>
  }

  return (
    <Section isSectionName={sectionName || false}>
      {sectionName}
      <AnimatePresence>
        {array?.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </AnimatePresence>
    </Section>
  )
}

export default TasksSection
