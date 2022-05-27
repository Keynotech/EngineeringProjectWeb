import { useQueryClient } from "react-query"

function useSingleProjectQuery(projectId) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(["projects", projectId])
  return data
}

export default useSingleProjectQuery
