import { useQuery } from "react-query"
import { getAll } from "../../api/tasks"

function useTasksQuery() {
  const data = useQuery(["tasks"], getAll, {
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
  return data
}

export default useTasksQuery
