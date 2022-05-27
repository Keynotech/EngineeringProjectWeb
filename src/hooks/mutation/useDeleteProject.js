import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/projects"

function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation((projectId) => del(projectId), {
    onMutate: async (projectId) => {
      queryClient.invalidateQueries(["tasks"])
      const previousProjects = queryClient.getQueryData(["projects"])
      const deletedProjectIndex = previousProjects.findIndex(
        (project) => project._id === projectId
      )
      const removedProject = [...previousProjects]
      removedProject.splice(deletedProjectIndex, 1)
      queryClient.setQueryData(["projects"], removedProject)
    },
    onSuccess: (projectId) => {
      queryClient.invalidateQueries(["projects", projectId])
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useDeleteTag
