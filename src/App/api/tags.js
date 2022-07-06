import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tags`

const post = async ({ tagName }) =>
  fetchWithError(API_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ tagName }),
  })

const getAll = async () =>
  fetchWithError(`${API_URL}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const getOne = async (tagId) =>
  fetchWithError(`${API_URL}/${tagId}`, {
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const del = async (tagId) =>
  fetchWithError(`${API_URL}/${tagId}`, {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const patch = async ({ tagId, props }) =>
  fetchWithError(`${API_URL}/${tagId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      Authorization: sessionStorage.getItem("Auth Token"),
    },
    body: JSON.stringify({ ...props }),
  })
export { post, getAll, getOne, del, patch }
