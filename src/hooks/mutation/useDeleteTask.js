import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { del } from "../../api/tasks"
import { hideTaskPage } from "../../store/features/layoutSlice"

function useDeleteTask(taskId) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  return useMutation(() => del(taskId), {
    onMutate: async () => {
      const previousTasks = queryClient.getQueryData(["tasks"])
      const deletedTaskIndex = previousTasks.findIndex(
        (task) => task._id === taskId
      )
      const removedTasks = [...previousTasks]
      removedTasks.splice(deletedTaskIndex, 1)
      queryClient.setQueryData(["tasks"], removedTasks)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchActive: false,
      })
      navigate(-1)
      _hideTaskPage()
    },
  })
}

export default useDeleteTask
