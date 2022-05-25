/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
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

/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import compareDate from "../../utils/sort/compareDate"
import compareInt from "../../utils/sort/compareInt"

function Section({ name, tasks }) {
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

function useGroupBy({ data, groupOptions, onGroupChange }) {
  const [groupKey, setGroupKey] = useState(groupOptions[0].key)
  const [sortKeyType, setSortKeyType] = useState(groupOptions[0].type)

  const groupData = (arr) => {
    const arrByPropertie = {}
    const sections = []
    arr.forEach((element) => {
      if (
        Object.prototype.hasOwnProperty.call(arrByPropertie, element[groupKey])
      ) {
        arrByPropertie[element[groupKey]].push(element)
      } else {
        arrByPropertie[element[groupKey]] = [element]
      }
    })
    for (const [propertie, tasksStatus] of Object.entries(arrByPropertie)) {
      sections.push(Section(propertie, tasksStatus))
    }
  }

  useEffect(() => {
    if (data?.length) {
      let groupedData = [...data]
      if (onGroupChange) {
        groupedData = groupData(groupedData)
        onGroupChange(groupedData)
      }
    }
  }, [data, groupKey])

  const handleGroupKeyChange = (key, type) => {
    if (groupKey !== key) {
      setGroupKey(key)
      setSortKeyType(type)
    }
  }

  return {
    handleGroupKeyChange,
    groupKey,
  }
}

export default useGroupBy
