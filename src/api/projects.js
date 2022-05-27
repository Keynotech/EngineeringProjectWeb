import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/projects`

const post = async ({ projectName }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ projectName }),
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
