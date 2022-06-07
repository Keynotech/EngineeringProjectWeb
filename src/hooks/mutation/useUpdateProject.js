import { useMutation, useQueryClient } from "react-query"
import { patch } from "../../api/projects"

function useUpdateProject(projectId) {
  const queryClient = useQueryClient()

  return useMutation((props) => patch({ projectId, props }), {
    onMutate: async (edited) => {
      await queryClient.cancelQueries(["projects"])

      const snapshotOfPreviousProjects = queryClient.getQueryData(["projects"])

      queryClient.setQueryData(["projects"], (previousProjects) =>
        previousProjects.map((project) => {
          if (project._id === projectId) {
            return {
              ...project,
              ...edited,
            }
          }
          return project
        })
      )

      queryClient.setQueryData(["projects", projectId], (previousProject) => ({
        ...previousProject,
        ...edited,
      }))

      return { snapshotOfPreviousProjects }
    },

    onError: ({ snapshotOfPreviousProjects }) => {
      queryClient.setQueryData(["projects"], snapshotOfPreviousProjects)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useUpdateProject
