import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/file"
import useUpdateTask from "./useUpdateTask"

function useDeleteFile(taskId) {
  const queryClient = useQueryClient()
  const updateTask = useUpdateTask(taskId)

  return useMutation((fileId) => del({ taskId, fileId }), {
    onMutate: async (fileId) => {
      const task = queryClient.getQueryData(["tasks", taskId])
      const removedFileIndex = task.files.findIndex(
        (file) => file._id === fileId
      )
      const updatedFilesList = [...task.files]
      updatedFilesList.splice(removedFileIndex, 1)
      updateTask.mutate({ files: updatedFilesList })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId],
        refetchActive: false,
      })
    },
  })
}

export default useDeleteFile
