import { useMutation, useQueryClient } from "react-query"
import { useLocation, useNavigate } from "react-router-dom"
import { del } from "../../api/folders"

function useDeleteFolder() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const location = useLocation()

  return useMutation((folderId) => del(folderId), {
    onMutate: async (folderId) => {
      await queryClient.cancelQueries(["folders"])

      queryClient.setQueryData(["folders"], (previousFolders) =>
        previousFolders.filter((folder) => folder._id !== folderId)
      )
      const previousProjects = queryClient.getQueryData(["projects"])
      const actualProject = []
      const currentLocation = location.pathname.split("/")

      previousProjects.forEach((project) => {
        if (project.folder !== folderId) {
          actualProject.push(project)
        } else if (currentLocation[2] === project._id) {
          navigate("inbox")
        }
      })

      queryClient.setQueryData(["projects"], actualProject)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["folders"])
      queryClient.invalidateQueries(["projects"])
      queryClient.invalidateQueries(["tasks"])
    },
  })
}

export default useDeleteFolder
