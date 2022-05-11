const API_URL = `http://192.168.0.159:5000/tasks`

const post = async ({ taskId, formData }) =>
  fetch(`${API_URL}/${taskId}/files`, {
    method: "POST",
    body: formData,
  }).then((res) => res.json())

export default post
