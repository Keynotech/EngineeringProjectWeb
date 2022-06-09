import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/projects"

function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation((projectId) => del(projectId), {
    onMutate: async (projectId) => {
      await queryClient.cancelQueries(["projects"])

      queryClient.setQueryData(["projects"], (previousProjects) =>
        previousProjects.filter((project) => project._id !== projectId)
      )
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries(["projects", projectId])
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useDeleteProject
