import { useMutation, useQueryClient } from "react-query"
import { post } from "../../api/folders"

function useCreateFolder() {
  const queryClient = useQueryClient()
  return useMutation((folderName) => post(folderName), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["folders"])
      queryClient.setQueriesData(["folders", data._id], data)
    },
  })
}

export default useCreateFolder
