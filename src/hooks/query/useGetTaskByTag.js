import { useQuery } from "react-query"
import { getTaskByTag } from "../../api/tasks"

function useGetTaskByTag(tagId) {
  const data = useQuery(["tasks", "byTag", tagId], () => getTaskByTag(tagId), {
    retry: 2,
  })
  //   const data = tasks.filter((task) => task.tags?.includes(tagId))

  return data
}

export default useGetTaskByTag
