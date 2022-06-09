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

/*

import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/file"

function useDeleteFile(taskId) {
  const queryClient = useQueryClient()

  return useMutation((fileId) => del({ taskId, fileId }), {
    onMutate: async (fileId) => {
      await queryClient.cancelQueries(["tasks"])

      const task = queryClient.getQueryData(["tasks", taskId])
      const updatedFilesList = task.files.filter((file) => file._id !== fileId)
      queryClient.setQueryData(["tasks", taskId], (prevTask) => ({
        ...prevTask,
        files: updatedFilesList,
      }))
      
    },
    onSuccess: () => {
      queryClient.invalidateQuery(["tasks"])
    },
  })
}

export default useDeleteFile



*/
