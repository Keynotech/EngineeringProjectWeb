import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tasks`

const post = async ({ title, status, dueDate, priority, tags }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, status, dueDate, priority, tags }),
  })

const getAll = async () => fetchWithError(`${API_URL}`)
const getOne = async (taskId) => fetchWithError(`${API_URL}/${taskId}`)

const getTaskByTag = async (tagId) =>
  fetchWithError(`${API_URL}/findByTag/${tagId}`)

const del = async (taskId) =>
  fetchWithError(`${API_URL}/${taskId}`, {
    method: "DELETE",
  })

const patch = async ({ taskId, props }) =>
  fetchWithError(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })

export { post, getAll, getOne, getTaskByTag, del, patch }
