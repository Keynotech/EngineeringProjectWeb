import { useQueryClient } from "react-query"

function useSingleFolderQuery(folderId) {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(["folders", folderId])
  return data
}

export default useSingleFolderQuery
