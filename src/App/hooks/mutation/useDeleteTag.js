import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/tags"

function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation((tagId) => del(tagId), {
    onMutate: async (tagId) => {
      await queryClient.cancelQueries(["tags"])

      queryClient.setQueryData(["tags"], (previousTags) =>
        previousTags.filter((tag) => tag._id !== tagId)
      )
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
