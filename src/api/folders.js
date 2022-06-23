import fetchWithError from "./fetchWithError"

const API_URL = `${process.env.REACT_APP_API_URL}/folders`

const post = async ({ folderName }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ folderName }),
  })

const getAll = async () => fetchWithError(`${API_URL}`)

const getOne = async (folderId) => fetchWithError(`${API_URL}/${folderId}`)

const del = async (folderId) =>
  fetchWithError(`${API_URL}/${folderId}`, {
    method: "DELETE",
  })

const patch = async ({ folderId, props }) =>
  fetchWithError(`${API_URL}/${folderId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })

const getProjectByFolder = async (folderId) =>
  fetchWithError(`${API_URL}/${folderId}/projects`)

export { post, getAll, getOne, del, patch, getProjectByFolder }
