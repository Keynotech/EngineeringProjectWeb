import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/tags"

function useUpdateTag(tagId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ tagId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["tasgs"])
      await queryClient.cancelQueries(["tags", tagId])
      const previousTags = await queryClient.getQueryData(["tags"])
      const index = previousTags.findIndex((tag) => tag._id === tagId)
      const previousTag = previousTags[index]
      const updatedTag = { ...previousTag, ...edited }
      const updatedTagsList = [...previousTags]
      updatedTagsList[index] = updatedTag
      queryClient.setQueryData(["tags"], updatedTagsList)
      queryClient.setQueryData(["tags", tagId], updatedTag)

      return { previousTag, previousTags }
    },

    onError: ({ previousTag, previousTags }) => {
      queryClient.setQueryData(["tags", tagId], previousTag)
      queryClient.setQueryData(["tags"], previousTags)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tags", tagId],
        refetchActive: false,
      })
      queryClient.invalidateQueries({
        queryKey: ["tags"],
        refetchActive: false,
      })
    },
  })
}

export default useUpdateTag
