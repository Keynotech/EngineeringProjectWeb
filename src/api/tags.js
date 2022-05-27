import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tags`

const post = async ({ tagName }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ tagName }),
  })

const getAll = async () => fetchWithError(`${API_URL}`)

const getOne = async (tagId) => fetchWithError(`${API_URL}/${tagId}`)

const del = async (tagId) =>
  fetchWithError(`${API_URL}/${tagId}`, {
    method: "DELETE",
  })

const patch = async ({ tagId, props }) =>
  fetchWithError(`${API_URL}/${tagId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...props }),
  })
export { post, getAll, getOne, del, patch }
