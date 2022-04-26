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

function useUpdateSingleTask(taskId) {
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
        console.log(taskId)
        await queryClient.cancelQueries(["tasks", taskId])
        await queryClient.cancelQueries(["tasks"])
        const previousTasks = queryClient.getQueryData(["tasks"])
        const previousTask = queryClient.getQueryData(["tasks", taskId])
        const updatedTask = { ...previousTask, ...edited }
        const updatedTasks = [...previousTasks]

        console.log("previousTask", previousTask)
        console.log("previousList", previousTasks)
        const index = updatedTasks.findIndex(
          (task) => task._id === updatedTask._id
        )

        queryClient.setQueryData(["tasks", taskId], updatedTask)
        if (index !== -1) {
          console.log("udaptedTask", updatedTask)
          updatedTasks[index] = updatedTask
          queryClient.setQueryData(["tasks"], updatedTasks)
        }
        console.log("updatedList", updatedTasks)

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
    }
  )
}

function useUpdateTaskOnList(taskId) {
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
        await queryClient.cancelQueries(["tasks"])
        const previousTasks = queryClient.getQueryData(["tasks"])
        const index = previousTasks.findIndex((task) => task._id === taskId)
        const previousTask = previousTasks[index]
        const updatedTask = { ...previousTask, ...edited }
        const updatedTasks = [...previousTasks]
        updatedTasks[index] = updatedTask
        queryClient.setQueryData(["tasks"], updatedTasks)
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
    }
  )
}

export { useTaskQuery, useTasksQuery, useUpdateSingleTask, useUpdateTaskOnList }
