import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/tasks"

function useUpdateTask(taskId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ taskId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["tasks"])
      await queryClient.cancelQueries(["tasks", taskId])
      const previousTasks = await queryClient.getQueryData(["tasks"])
      const index = previousTasks.findIndex((task) => task._id === taskId)
      const previousTask = previousTasks[index]
      const updatedTask = { ...previousTask, ...edited, updated: new Date() }
      const updatedTasksList = [...previousTasks]
      updatedTasksList[index] = updatedTask
      queryClient.setQueryData(["tasks"], updatedTasksList)
      queryClient.setQueryData(["tasks", taskId], updatedTask)

      return { previousTask, previousTasks }
    },

    onError: ({ previousTask, previousTasks }) => {
      queryClient.setQueryData(["tasks", taskId], previousTask)
      queryClient.setQueryData(["tasks"], previousTasks)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", taskId],
        refetchActive: false,
      })
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchActive: false,
      })
    },
  })
}

export default useUpdateTask
