/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { post } from "../../api/tasks"
import { showTaskPage } from "../../store/features/layoutSlice"

function useCreateTask() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())
  return useMutation(
    ({ title, status, dueDate, priority, tags, project }) =>
      post({ title, status, dueDate, priority, tags, project }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        })
        const tasks = queryClient.getQueryData(["tasks"])
        const updatedTasksList = [...tasks, data]
        queryClient.setQueryData(["tasks"], updatedTasksList)
        queryClient.setQueryData(["tasks", data._id], data)
        navigate(`tasks/${data._id}`)
        _showTaskPage()

        // queryClient.invalidateQueries({
        // queryKey: ["tasks"],
        // refetchActive: false,
        // })
      },
    }
  )
}

export default useCreateTask
