import { useMutation, useQueryClient } from "react-query"
import { post } from "../../api/projects"

function useCreateProject() {
  const queryClient = useQueryClient()
  return useMutation(
    ({ projectName, folder }) => post({ projectName, folder }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["projects"])
        queryClient.setQueriesData(["projects", data._id], data)
      },
    }
  )
}

export default useCreateProject
