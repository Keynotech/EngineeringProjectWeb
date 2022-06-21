import Axios from "axios"
import FileDownload from "js-file-download"
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

const downloadFile = async ({ taskId, fileId, filename }) => {
  Axios({
    url: `API_URL/${taskId}/${fileId}`,
    method: "GET",
    responseType: "blob",
  }).then((res) => {
    FileDownload(res.data, filename)
  })
}

export { post, del, downloadFile }
