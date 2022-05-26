/* eslint-disable react/prop-types */
import React from "react"
import { AnimatePresence } from "framer-motion"
import TaskItem from "../TaskItem/TaskItem"

function ListSection({ title, array }) {
  let sectionName = null
  if (title) {
    sectionName = <h4>{title}</h4>
  }

  return (
    <section>
      {sectionName}
      <AnimatePresence>
        {array?.map((task) => (
          <TaskItem task={task} key={task._id} />
        ))}
      </AnimatePresence>
    </section>
  )
}

export default ListSection
