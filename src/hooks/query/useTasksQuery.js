import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/tasks"

function useTasksQuery() {
  const queryClient = useQueryClient()

  const data = useQuery(["tasks"], getAll, {
    cacheTime: 60 * 5 * 1000,
  })
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["tasks", e._id], e)
    })
  }
  return data
}

export default useTasksQuery
