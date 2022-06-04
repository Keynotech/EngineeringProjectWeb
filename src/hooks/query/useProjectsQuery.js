import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/projects"

function useProjectsQuery() {
  const queryClient = useQueryClient()
  const data = useQuery(["projects"], getAll, {
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["projects", e._id], e)
    })
  }
  return data
}

export default useProjectsQuery
