import { useMutation, useQueryClient } from "react-query"
import useUpdateTask from "./useUpdateTask"
import post from "../../api/file"

function useUploadFile(taskId) {
  const queryClient = useQueryClient()
  const updateTask = useUpdateTask(taskId)
  return useMutation((formData) => post({ taskId, formData }), {
    onSuccess: (data) => {
      const task = queryClient.getQueryData(["tasks", taskId])
      updateTask.mutate({ files: [...task.files, data._id] })
    },
  })
}

export default useUploadFile
