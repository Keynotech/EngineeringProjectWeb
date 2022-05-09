import { useMutation, useQueryClient } from "react-query"
import { post } from "../../api/tags"

function useCreateTag() {
  const queryClient = useQueryClient()
  return useMutation((tagName) => post(tagName), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tags"])
      queryClient.setQueriesData(["tags", data._id], data)
    },
  })
}

export default useCreateTag
