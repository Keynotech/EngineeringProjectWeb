import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { del } from "../../api/tasks"
import { hideTaskPage } from "../../store/features/layoutSlice"

function useDeleteTask(taskId) {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const _hideTaskPage = () => dispatch(hideTaskPage())

  return useMutation(() => del(taskId), {
    onMutate: async () => {
      await queryClient.cancelQueries(["tasks"])

      queryClient.setQueryData(["tasks"], (previousTasks) =>
        previousTasks.filter((task) => task._id !== taskId)
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
        refetchActive: false,
      })
      _hideTaskPage()
    },
  })
}

export default useDeleteTask
