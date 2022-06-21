import { useQuery } from "react-query"
import { getTaskByProject } from "../../api/projects"

function useGetTaskByProject(projectId) {
  const data = useQuery(
    ["tasks", "byProject", projectId],
    () => getTaskByProject(projectId),
    {
      retry: 2,
    }
  )
  //   const data = tasks.filter((task) => task.tags?.includes(tagId))

  return data
}

export default useGetTaskByProject
