import { useQuery } from "react-query"
import { getAll } from "../../api/projects"

function useProjectQuery() {
  const data = useQuery(["projects"], getAll, {
    staleTime: 2 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  })
  return data
}

export default useProjectQuery
