import { useQuery, useQueryClient } from "react-query"
import { getAll } from "../../api/folders"

function useFoldersQuery() {
  const queryClient = useQueryClient()
  const data = useQuery(["folders"], getAll, {
    staleTime: Infinity,
    cacheTime: Infinity,
  })
  if (data.isSuccess) {
    data.data.forEach((e) => {
      queryClient.setQueryData(["folders", e._id], e)
    })
  }
  return data
}

export default useFoldersQuery
