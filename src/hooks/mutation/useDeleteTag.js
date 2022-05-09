import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/tags"

function useDeleteTag(tagId) {
  const queryClient = useQueryClient()

  return useMutation(() => del(tagId), {
    onMutate: async () => {
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
    },
  })
}

export default useDeleteTag