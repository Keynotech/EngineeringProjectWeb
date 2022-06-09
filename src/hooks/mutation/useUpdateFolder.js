import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/folders"

function useUpdateFolder(folderId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ folderId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["folders"])

      const snapshotOfPreviousFolders = queryClient.getQueryData(["folders"])

      queryClient.setQueryData(["folders"], (previousFolders) =>
        previousFolders.map((folder) => {
          if (folder._id === folderId) {
            return {
              ...folder,
              ...edited,
            }
          }
          return folder
        })
      )

      queryClient.setQueryData(["folders", folderId], (previousFolder) => ({
        ...previousFolder,
        ...edited,
      }))

      return { snapshotOfPreviousFolders }
    },

    onError: ({ snapshotOfPreviousFolders }) => {
      queryClient.setQueryData(["folders"], snapshotOfPreviousFolders)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"])
    },
  })
}

export default useUpdateFolder
