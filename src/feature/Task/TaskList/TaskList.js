/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from "react"
import { AnimatePresence } from "framer-motion"
import { useQueryClient } from "react-query"
import { useSelector } from "react-redux"
import styled from "styled-components"
import TaskItem from "../TaskItem/TaskItem"
import TaskInput from "../TaskInput/TaskInput"
import TaskListHeader from "./TaskListHeader"
import useTasksQuery from "../../../hooks/query/useTasksQuery"
import SortController from "./SortController"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
  padding-bottom: 140px;
`

function TasksList({ listName, listIcon }) {
  const tasksQuery = useTasksQuery()
  const queryClient = useQueryClient()
  const setSortedTasks = (data) => {
    const sortedList = [...data]
    queryClient.setQueryData(["tasks"], sortedList)
  }

  const sortOptions = [
    { name: "Created date", key: "createdAt", type: "date" },
    { name: "Due date", key: "dueDate", type: "date" },
    { name: "Priority", key: "priority", type: "int" },
  ]

  // Selectors
  // ===========================================================================
  const taskInputVisibility = useSelector(
    (state) => state.layout.taskInputVisibility
  )

  return (
    <Wrapper>
      <TaskListHeader
        name={listName}
        icon={listIcon}
        additionaInfo={
          tasksQuery.data ? `${tasksQuery.data.length} tasks` : null
        }
      />
      <SortController
        data={tasksQuery.data}
        onSortChange={setSortedTasks}
        sortOptions={sortOptions}
      />
      <AnimatePresence>
        {taskInputVisibility ? <TaskInput /> : null}
        {tasksQuery.isSuccess
          ? tasksQuery.data.map((task) => (
              <TaskItem task={task} key={task._id} />
            ))
          : null}
      </AnimatePresence>
    </Wrapper>
  )
}

export default TasksList

/*
function Section(name, tasks) {
  return (
    <div>
      <h2>{name}</h2>
      {tasks.map((task) => (
        <li key={task._id}>
          <input type="checkbox" checked={task.status} />
          <span>{task.title}</span>
        </li>
      ))}
    </div>
  )
}

function TasksList({ tasks }) {
  const tasksByStatus = {}
  const sections = []

  tasks.forEach((element) => {
    if (tasksByStatus.hasOwnProperty(element.status)) {
      tasksByStatus[element.status].push(element)
    } else {
      tasksByStatus[element.status] = [element]
    }
  })
  for (const [status, tasksStatus] of Object.entries(tasksByStatus)) {
    sections.push(Section(status, tasksStatus))
  }

  return (
    <Wrapper>
      {sections.map((elem, index) => (
        <div key={index}>{elem}</div>
      ))}
    </Wrapper>
  )
}
*/
