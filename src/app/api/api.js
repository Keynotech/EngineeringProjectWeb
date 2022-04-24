import { useQuery } from "react-query"

function useTaskQuery(taskId) {
  const data = useQuery(["tasks", taskId], () =>
    fetch(`http://localhost:5000/tasks/${taskId}`).then((res) => res.json())
  )
  return data
}

function useTasksQuery() {
  const data = useQuery(["tasks"], () =>
    fetch(`http://localhost:5000/tasks`).then((res) => res.json())
  )
  return data
}

export { useTaskQuery, useTasksQuery }
