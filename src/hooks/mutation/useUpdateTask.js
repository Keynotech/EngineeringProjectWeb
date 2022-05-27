import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/tasks"

function useUpdateTask(taskId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ taskId, props }), {
    onMutate: (edited) => {
      const previousTasks = queryClient.getQueryData(["tasks"])
      if (previousTasks) {
        const index = previousTasks.findIndex((task) => task._id === taskId)
        const previousTask = previousTasks[index]
        const updatedTask = { ...previousTask, ...edited, updated: new Date() }
        const updatedTasksList = [...previousTasks]
        updatedTasksList[index] = updatedTask
        queryClient.setQueryData(["tasks"], updatedTasksList)
        queryClient.setQueryData(["tasks", taskId], updatedTask)
      }

      return { previousTasks }
    },

    onError: ({ previousTasks }) => {
      queryClient.setQueryData(["tasks"], previousTasks)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useUpdateTask
