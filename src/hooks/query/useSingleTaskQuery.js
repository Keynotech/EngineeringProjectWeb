import { useQuery } from "react-query"
import { getOne } from "../../api/tasks"

function useTaskQuery(taskId) {
  const data = useQuery(["tasks", taskId], () => getOne(taskId), {
    retry: 0,
  })
  return data
}

export default useTaskQuery
