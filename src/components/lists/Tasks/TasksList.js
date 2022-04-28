/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import TaskItem from "../../item/Task/TaskItem/TaskItem"
import TaskInput from "../../input/TaskInput/TaskInput"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`

function TasksList({ tasks }) {
  const taskInputVisibility = useSelector(
    (state) => state.layout.taskInputVisibility
  )

  return (
    <Wrapper>
      <ul>
        {taskInputVisibility ? <TaskInput /> : null}
        {tasks
          ? tasks.data.map((task) => <TaskItem task={task} key={task._id} />)
          : null}
      </ul>
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
