import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/tags"

function useUpdateTag(tagId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ tagId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["tags"])

      const snapshotOfPreviousTags = queryClient.getQueryData(["tags"])

      queryClient.setQueryData(["tags"], (previousTags) =>
        previousTags.map((tag) => {
          if (tag._id === tagId) {
            return {
              ...tag,
              ...edited,
            }
          }
          return tag
        })
      )

      queryClient.setQueryData(["tags", tagId], (previousTag) => ({
        ...previousTag,
        ...edited,
      }))

      return { snapshotOfPreviousTags }
    },

    onError: ({ snapshotOfPreviousTags }) => {
      queryClient.setQueryData(["tags"], snapshotOfPreviousTags)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useUpdateTag
