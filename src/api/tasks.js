const API_URL = `http://192.168.0.159:5000/tasks`

const post = async ({ title, status, dueDate, priority, tags }) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, status, dueDate, priority, tags }),
  }).then((res) => res.json())

const getAll = async () => fetch(`${API_URL}`).then((res) => res.json())

const getOne = async (taskId) =>
  fetch(`${API_URL}/${taskId}`).then((res) => res.json())

const del = async (taskId) =>
  fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  }).then((res) => res.json())

const patch = async ({ taskId, props }) =>
  fetch(`${API_URL}/${taskId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  }).then((res) => res.json())

export { post, getAll, getOne, del, patch }
