import Axios from "axios"
import FileDownload from "js-file-download"
import fetchWithError from "./fetchWithError"

const API_URL = `http://localhost:5000/tasks`

const post = async ({ taskId, formData }) =>
  fetchWithError(`${API_URL}/${taskId}/files`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const del = async ({ taskId, fileId }) =>
  fetchWithError(`${API_URL}/${taskId}/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  })

const downloadFile = async ({ taskId, fileId, filename }) => {
  Axios({
    url: `API_URL/${taskId}/${fileId}`,
    method: "GET",
    responseType: "blob",
    headers: {
      Authorization: sessionStorage.getItem("Auth Token"),
    },
  }).then((res) => {
    FileDownload(res.data, filename)
  })
}

export { post, del, downloadFile }
