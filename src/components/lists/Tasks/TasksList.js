/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from "react"
import styled from "styled-components"

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    border-bottom: 1px solid ${(props) => props.theme.tertiary};
    padding: 20px 0;
    margin-bottom: 2px;
  }
`

function TasksList({ tasks }) {
  return (
    <Wrapper>
      {tasks
        ? tasks.map((task) => (
            <li key={task._id}>
              <input type="checkbox" checked={task.status} readOnly />
              <span>{task.title}</span>
            </li>
          ))
        : null}
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
