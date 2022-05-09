import { useQuery } from "react-query"
import { getAll } from "../../api/tasks"

function useTasksQuery() {
  const data = useQuery(["tasks"], getAll)
  return data
}

export default useTasksQuery
