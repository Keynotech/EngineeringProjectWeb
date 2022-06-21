import { useQueryClient } from "react-query"

function useGetTaskTags(tagsId) {
  const queryClient = useQueryClient()
  const data = []
  tagsId?.forEach((tagId) => {
    const tag = queryClient.getQueryData(["tags", tagId])
    data.push(tag)
  })
  return data
}

export default useGetTaskTags
