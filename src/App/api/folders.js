import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/folders`

const post = async ({ folderName }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ folderName }),
  })

const getAll = async () =>
  fetchWithError(`${API_URL}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const getOne = async (folderId) =>
  fetchWithError(`${API_URL}/${folderId}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const del = async (folderId) =>
  fetchWithError(`${API_URL}/${folderId}`, {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const patch = async ({ folderId, props }) =>
  fetchWithError(`${API_URL}/${folderId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ ...props }),
  })

const getProjectByFolder = async (folderId) =>
  fetchWithError(`${API_URL}/${folderId}/projects`)

export { post, getAll, getOne, del, patch, getProjectByFolder }
