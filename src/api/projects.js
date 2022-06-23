import fetchWithError from "./fetchWithError"

const API_URL = `${process.env.REACT_APP_API_URL}/projects`

const post = async ({ projectName, folder }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ projectName, folder }),
  })

const getAll = async () => fetchWithError(`${API_URL}`)

const getOne = async (projectId) => fetchWithError(`${API_URL}/${projectId}`)

const del = async (projectId) =>
  fetchWithError(`${API_URL}/${projectId}`, {
    method: "DELETE",
  })

const patch = async ({ projectId, props }) =>
  fetchWithError(`${API_URL}/${projectId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })

const getTaskByProject = async (projectId) =>
  fetchWithError(`${API_URL}/${projectId}/tasks`)

export { post, getAll, getOne, del, patch, getTaskByProject }
