import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/projects"

function useProjectsQuery() {
  const queryClient = useQueryClient()
  const data = useQuery(["projects"], getAll, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["projects", e._id], e)
    })
  }
  return data
}

export default useProjectsQuery
