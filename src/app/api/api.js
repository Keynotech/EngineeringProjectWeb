/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query"

function useTaskQuery(taskId) {
  const data = useQuery(["tasks", taskId], () =>
    fetch(`http://localhost:5000/tasks/${taskId}`).then((res) => res.json())
  )
  return data
}

function useTasksQuery() {
  const data = useQuery(["tasks"], () =>
    fetch(`http://localhost:5000/tasks`).then((res) => res.json())
  )
  return data
}

function useUpdateTask(taskId) {
  const queryClient = useQueryClient()

  return useMutation(
    ({ ...props }) => {
      fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ ...props }),
      }).then((res) => res.json())
    },
    {
      onMutate: async (edited) => {
        await queryClient.cancelQueries(["tasks", taskId])
        const previousTask = queryClient.getQueryData(["tasks", taskId])
        const previousTasks = queryClient.getQueryData(["tasks"])
        const updatedTask = { ...previousTask, ...edited }
        const updatedTasks = [...previousTasks]

        const index = updatedTasks.findIndex(
          (todo) => todo._id === updatedTask._id
        )

        queryClient.setQueryData(["tasks", taskId], updatedTask)
        if (index !== -1) {
          updatedTasks[index] = updatedTask
          queryClient.setQueryData(["tasks"], updatedTasks)
        }

        return { previousTask }
      },

      onError: (previousTask) =>
        queryClient.setQueryData(["tasks", taskId], previousTask),

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
    }
  )
}

export { useTaskQuery, useTasksQuery, useUpdateTask }
