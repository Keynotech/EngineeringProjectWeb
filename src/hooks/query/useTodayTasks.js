import { useQuery } from "react-query"
import { isPast, isToday } from "date-fns"
import { getAll } from "../../api/tasks"

function useTodayTasks() {
  const data = useQuery(["tasks"], getAll, {
    cacheTime: Infinity,
    select: (tasks) =>
      tasks.filter(
        (task) =>
          task.dueDate &&
          (isToday(new Date(task.dueDate)) || isPast(new Date(task.dueDate)))
      ),
  })

  return data
}

export default useTodayTasks
