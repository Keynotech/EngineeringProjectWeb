/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { showTaskPage } from "../store/features/layoutSlice"

function useTaskQuery(taskId) {
  const data = useQuery(["tasks", taskId], () =>
    fetch(`http://192.168.0.159:5000/tasks/${taskId}`).then((res) => res.json())
  )
  return data
}

function useTasksQuery() {
  const data = useQuery(["tasks"], () =>
    fetch(`http://192.168.0.159:5000/tasks`).then((res) => res.json())
  )
  return data
}

function useUpdateSingleTask(taskId) {
  const queryClient = useQueryClient()

  return useMutation(
    ({ ...props }) => {
      fetch(`http://192.168.0.159:5000/tasks/${taskId}`, {
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
        await queryClient.cancelQueries(["tasks", taskId])
        const previousTasks = queryClient.getQueryData(["tasks"])
        const previousTask = queryClient.getQueryData(["tasks", taskId])
        const updatedTask = { ...previousTask, ...edited, updated: new Date() }
        const updatedTasks = [...previousTasks]

        const index = updatedTasks.findIndex(
          (task) => task._id === updatedTask._id
        )

        queryClient.setQueryData(["tasks", taskId], updatedTask)
        if (index !== -1) {
          updatedTasks[index] = updatedTask
          queryClient.setQueryData(["tasks"], updatedTasks)
        }

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
      fetch(`http://192.168.0.159:5000/tasks/${taskId}`, {
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
        const updatedTask = { ...previousTask, ...edited, updated: new Date() }
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

/*
function useCreateNewTask() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const _showTaskPage = dispatch(showTaskPage())
  return useMutation(
    ({ title, isDone, dueDate, priority }) => {
      fetch(`http://192.168.0.159:5000/tasks/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ title, status: isDone, dueDate, priority }),
      }).then((res) => res.json())
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tasks"])
        queryClient.setQueriesData(["tasks", data._id], data)
        navigate(`tasks/${data._id}`)
        _showTaskPage()
      },
    }
  )
}
*/

export { useTaskQuery, useTasksQuery, useUpdateSingleTask, useUpdateTaskOnList }
