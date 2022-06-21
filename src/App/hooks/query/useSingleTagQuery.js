import { useQueryClient } from "react-query"

function useSingleTagQuery(tagId) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(["tags", tagId])
  return data
}

export default useSingleTagQuery
