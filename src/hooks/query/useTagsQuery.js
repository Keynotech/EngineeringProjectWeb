import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/tags"

function useTagsQuery() {
  const queryClient = useQueryClient()
  const data = useQuery(["tags"], getAll)
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["tags", e._id], e)
    })
  }
  return data
}

export default useTagsQuery
