import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/tasks"

function useTasksQuery(filter) {
  const queryClient = useQueryClient()

  const data = useQuery(["tasks"], getAll, {
    cacheTime: Infinity,
    select: filter || null,
  })
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["tasks", e._id], e)
    })
  }
  return data
}

export default useTasksQuery
