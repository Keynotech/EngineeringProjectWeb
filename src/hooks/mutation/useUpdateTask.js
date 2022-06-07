import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/tasks"

function useUpdateTask(taskId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ taskId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["tasks"])

      const snapshotOfPreviousTasks = queryClient.getQueryData(["tasks"])

      queryClient.setQueryData(["tasks"], (previousTasks) =>
        previousTasks.map((task) => {
          if (task._id === taskId) {
            return {
              ...task,
              ...edited,
              updated: new Date(),
            }
          }
          return task
        })
      )

      queryClient.setQueryData(["tasks", taskId], (previousTask) => ({
        ...previousTask,
        ...edited,
        updated: new Date(),
      }))

      return { snapshotOfPreviousTasks }
    },

    onError: ({ snapshotOfPreviousTasks }) => {
      queryClient.setQueryData(["tasks"], snapshotOfPreviousTasks)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useUpdateTask
