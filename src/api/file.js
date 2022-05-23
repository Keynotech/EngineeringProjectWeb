import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tasks`

const post = async ({ taskId, formData }) =>
  fetchWithError(`${API_URL}/${taskId}/files`, {
    method: "POST",
    body: formData,
  })

const del = async ({ taskId, fileId }) =>
  fetchWithError(`${API_URL}/${taskId}/${fileId}`, {
    method: "DELETE",
  })

export { post, del }
