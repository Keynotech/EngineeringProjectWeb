// import FileDownload from "js-file-download"
import fetchWithError from "./fetchWithError"

const API_URL = `${process.env.REACT_APP_API_URL}/tasks`

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
  fetch(`${API_URL}/${taskId}/${fileId}`, {
    method: "GET",
    responseType: "blob",
  })
    .then((res) => res.blob())
    .then((blob) => {
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
    })
}

export { post, del, downloadFile }
