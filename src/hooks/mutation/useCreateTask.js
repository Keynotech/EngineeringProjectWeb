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
    ({ title, status, dueDate, priority, tags }) =>
      post({ title, status, dueDate, priority, tags }),
    {
      onSuccess: (data) => {
        // const tasks = queryClient.getQueryData(["tasks"])
        queryClient.invalidateQueries(["tasks"])
        // const updatedTasksList = [...tasks, data]
        // queryClient.setQueryData(["tasks"], updatedTasksList)
        // queryClient.setQueryData(["tasks", data._id], data)
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
