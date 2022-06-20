/* eslint-disable react/prop-types */
import React from "react"
import styled, { css } from "styled-components"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { showTaskPage } from "../../../store/features/layoutSlice"
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

  // Dispatch
  // ===========================================================================
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())

  return (
    <Section isSectionName={sectionName || false}>
      {sectionName}
      <AnimatePresence>
        {array?.map((task) => (
          <motion.div
            key={task._id}
            initial={{ opacity: 0 }}
            animate={{ x: [300, -20, 0], opacity: 1, duration: 0.4 }}
            exit={{ opacity: 0, duration: 0.4 }}
          >
            <Link to={`tasks/${task._id}`} onClick={_showTaskPage}>
              <TaskItem task={task} />
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </Section>
  )
}

export default TasksSection
