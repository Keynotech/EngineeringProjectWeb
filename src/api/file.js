const API_URL = `http://192.168.0.159:5000/tasks`

const post = async ({ taskId, formData }) =>
  fetch(`${API_URL}/${taskId}/files`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json())

const del = async ({ taskId, fileId }) =>
  fetch(`${API_URL}/${taskId}/${fileId}`, {
    method: "DELETE",
  }).then((res) => res.json())

export { post, del }
