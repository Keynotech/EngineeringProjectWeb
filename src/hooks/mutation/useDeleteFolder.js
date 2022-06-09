import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/folders"

function useDeleteFolder() {
  const queryClient = useQueryClient()

  return useMutation((folderId) => del(folderId), {
    onMutate: async (folderId) => {
      await queryClient.cancelQueries(["folders"])

      queryClient.setQueryData(["folders"], (previousFolders) =>
        previousFolders.filter((folder) => folder._id !== folderId)
      )
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries(["folders", projectId])
      queryClient.invalidateQueries(["folders"])
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useDeleteFolder
