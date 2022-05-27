/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "react-query"
import useUpdateTask from "./useUpdateTask"
import { post } from "../../api/file"

function useUploadFile(taskId) {
  const queryClient = useQueryClient()
  const updateTask = useUpdateTask(taskId)
  return useMutation((formData) => post({ taskId, formData }), {
    onSuccess: async (data) => {
      const task = queryClient.getQueryData(["tasks", taskId])
      const updatedFilesList = [...task.files, ...data]
      updateTask.mutate({ files: updatedFilesList })
    },
  })
}

export default useUploadFile
