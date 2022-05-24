import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/tags"

function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation((tagId) => del(tagId), {
    onMutate: async (tagId) => {
      const previousTags = queryClient.getQueryData(["tags"])
      const deletedTagIndex = previousTags.findIndex((tag) => tag._id === tagId)
      const removedTags = [...previousTags]
      removedTags.splice(deletedTagIndex, 1)
      queryClient.setQueryData(["tags"], removedTags)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags"],
        refetchActive: false,
      })
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useDeleteTag
