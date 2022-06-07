import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/file"
import useUpdateTask from "./useUpdateTask"

function useDeleteFile(taskId) {
  const queryClient = useQueryClient()
  const updateTask = useUpdateTask(taskId)

  return useMutation((fileId) => del({ taskId, fileId }), {
    onMutate: async (fileId) => {
      const task = queryClient.getQueryData(["tasks", taskId])
      const updatedFilesList = task.files.filter((file) => file._id !== fileId)

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
