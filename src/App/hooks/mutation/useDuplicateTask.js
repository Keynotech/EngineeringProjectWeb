import { useMutation, useQueryClient } from "react-query"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { post } from "../../api/tasks"
import { showTaskPage } from "../../store/features/layoutSlice"

function useDuplicateTask() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const _showTaskPage = () => dispatch(showTaskPage())
  return useMutation(
    (task) => {
      const taskData = {
        title: task.title,
        priority: task.priority,
        description: task.description,
        status: task.status,
        tags: task.tags,
        dueDate: task.dueDate,
        project: task.project,
      }
      return post({ ...taskData })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        })
        queryClient.setQueryData(["tasks"], (prevTasks) => [...prevTasks, data])
        queryClient.setQueryData(["tasks", data._id], data)
        navigate(`../tasks/${data._id}`)
        _showTaskPage()
      },
    }
  )
}

export default useDuplicateTask
