import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/projects`

const post = async ({ projectName, folder }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ projectName, folder }),
  })

const getAll = async () =>
  fetchWithError(`${API_URL}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const getOne = async (projectId) =>
  fetchWithError(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const del = async (projectId) =>
  fetchWithError(`${API_URL}/${projectId}`, {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const patch = async ({ projectId, props }) =>
  fetchWithError(`${API_URL}/${projectId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ ...props }),
  })

const getTaskByProject = async (projectId) =>
  fetchWithError(`${API_URL}/${projectId}/tasks`)

export { post, getAll, getOne, del, patch, getTaskByProject }
