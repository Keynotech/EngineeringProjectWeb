const API_URL = `http://192.168.0.159:5000/tags`

const post = ({ tagName }) =>
  fetch(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ tagName }),
  }).then((res) => res.json())

const getAll = async () => fetch(`${API_URL}`).then((res) => res.json())

const getOne = async (tagId) =>
  fetch(`${API_URL}/${tagId}`).then((res) => res.json())

const del = async (tagId) =>
  fetch(`${API_URL}/${tagId}`, {
    method: "DELETE",
  }).then((res) => res.json())

const patch = async ({ tagId, props }) =>
  fetch(`${API_URL}/${tagId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  }).then((res) => res.json())

export { post, getAll, getOne, del, patch }
