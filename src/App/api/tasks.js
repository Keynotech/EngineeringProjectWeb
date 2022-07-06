import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tasks`

const post = async ({ title, status, dueDate, priority, tags, project }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, status, dueDate, priority, tags, project }),
  })

const getAll = async () =>
  fetchWithError(`${API_URL}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })
const getOne = async (taskId) =>
  fetchWithError(`${API_URL}/${taskId}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const getTaskByTag = async (tagId) =>
  fetchWithError(`${API_URL}/findByTag/${tagId}`)

const del = async (taskId) =>
  fetchWithError(`${API_URL}/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.token,
    },
  })

const patch = async ({ taskId, props }) =>
  fetchWithError(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ ...props }),
  })

export { post, getAll, getOne, getTaskByTag, del, patch }
