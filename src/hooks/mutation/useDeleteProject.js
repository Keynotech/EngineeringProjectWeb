import { useMutation, useQueryClient } from "react-query"
import { del } from "../../api/tags"

function useDeleteTag() {
  const queryClient = useQueryClient()

  return useMutation((projectId) => del(projectId), {
    onMutate: async (projectId) => {
      const previousProjects = queryClient.getQueryData(["projects"])
      const deletedProjectIndex = previousProjects.findIndex(
        (tag) => tag._id === projectId
      )
      const removedProject = [...previousProjects]
      removedProject.splice(deletedProjectIndex, 1)
      queryClient.setQueryData(["projects"], removedProject)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
        refetchActive: false,
      })
      queryClient.invalidateQueries(["projects"])
    },
  })
}

export default useDeleteTag
