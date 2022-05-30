/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import TaskInput from "../TaskInput/TaskInput"
import TaskListHeader from "./TaskListHeader"
import GroupController from "./GroupController"
import ListSection from "./ListSection"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
  padding-bottom: 140px;
`

function TasksList({ tasks, listName, listIcon }) {
  const [sections, setSections] = useState()
  const onGroupChange = (data) => {
    setSections(data)
  }

  const groupOptions = [
    { name: "Default", key: "default" },
    { name: "Due date", key: "dueDate" },
    { name: "Created date", key: "createdAt" },
    { name: "Priority", key: "priority" },
  ]

  // Selectors
  // ===========================================================================
  const taskInputVisibility = useSelector(
    (state) => state.layout.taskInputVisibility
  )

  let SortingController = null
  if (tasks.isSuccess) {
    SortingController = (
      <GroupController
        data={tasks.isSuccess ? tasks.data : null}
        onGroupChange={onGroupChange}
        groupOptions={groupOptions}
      />
    )
  }

  const tasksCounter = `${tasks.isSuccess ? tasks.data.length : 0} tasks`

  return (
    <Wrapper>
      <TaskListHeader
        name={listName}
        icon={listIcon}
        additionaInfo={tasksCounter}
      >
        {SortingController}
      </TaskListHeader>

      {taskInputVisibility ? <TaskInput /> : null}
      {tasks.isSuccess && sections && sections.length
        ? sections.map((section) => (
            <ListSection
              key={section.key}
              title={section.name}
              array={section.array}
            />
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
