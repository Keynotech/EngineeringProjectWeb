/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import groupByDate from "./groupByDate"
import groupByPriority from "./groupByPriority"

function useGroupBy({ data, groupOptions, onGroupChange }) {
  const [groupOption, setGroupOption] = useState(groupOptions[0])

  const groupData = (arr) => {
    let arrByPropertie = {}
    const { key } = groupOption

    if (key === "default") {
      arrByPropertie = [{ key: "default", name: null, array: data }]
    } else if (key === "createdAt") {
      const nullKeyName = ""
      arrByPropertie = groupByDate({ arr, key, nullKeyName })
    } else if (key === "dueDate") {
      const nullKeyName = "No due date"
      arrByPropertie = groupByDate({ arr, key, nullKeyName })
    } else if (key === "priority") {
      arrByPropertie = groupByPriority({ arr, key })
    }

    return arrByPropertie
  }

  useEffect(() => {
    let groupedData = [...data]
    if (onGroupChange) {
      groupedData = groupData(groupedData)
      onGroupChange(groupedData)
    }
  }, [data, groupOption])

  const handleGroupOptionChange = (newGroupOption) => {
    if (groupOption !== newGroupOption) {
      setGroupOption(newGroupOption)
    }
  }

  return {
    handleGroupOptionChange,
    groupOption,
  }
}

export default useGroupBy

/* eslint-disable array-callback-return */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-lonely-if */
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
