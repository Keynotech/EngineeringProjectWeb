import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/projects"

function useUpdateProject(projectId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ projectId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["projects"])
      await queryClient.cancelQueries(["projects", projectId])
      const previousProjects = await queryClient.getQueryData(["projects"])
      const index = previousProjects.findIndex((tag) => tag._id === projectId)
      const previousProject = previousProjects[index]
      const updatedProject = { ...previousProject, ...edited }
      const updatedTagsList = [...previousProjects]
      updatedTagsList[index] = updatedProject
      queryClient.setQueryData(["projects"], updatedTagsList)
      queryClient.setQueryData(["projects", projectId], updatedProject)

      return { updatedProject, previousProjects }
    },

    onError: ({ updatedProject, previousProjects }) => {
      queryClient.setQueryData(["projects", projectId], updatedProject)
      queryClient.setQueryData(["projects"], previousProjects)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects", projectId])
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["projects"])
    },
  })
}

export default useUpdateProject
