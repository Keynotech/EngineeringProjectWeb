/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import styled, { css } from "styled-components"
import TaskInput from "../TaskInput/TaskInput"
import TaskListHeader from "./TaskListHeader"
import GroupController from "./GroupController"
import TasksSection from "./TasksSection"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 140px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 400px;
`

function TasksList({
  tasks,
  listName,
  listIcon,
  inputPriorityVal,
  inputProjectVal,
  inputTagVal,
  inputDueDateVal,
  groupOptions,
}) {
  const { t } = useTranslation()
  const [sections, setSections] = useState()
  const onGroupChange = (data) => {
    setSections(data)
  }

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
      <ListContainer taskInputIsOpen={taskInputVisibility}>
        {taskInputVisibility ? (
          <TaskInput
            project={inputProjectVal}
            dueDate={inputDueDateVal}
            tag={inputTagVal}
            priority={inputPriorityVal}
          />
        ) : null}
        {tasks.isSuccess && sections && sections.length
          ? sections.map((section) => (
              <TasksSection
                key={section.key}
                title={section.name}
                array={section.array}
              />
            ))
          : null}
      </ListContainer>
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
