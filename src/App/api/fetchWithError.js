import { firebaseAuth } from "../../firebase"

async function fetchWithError(url, options) {
  const token = await firebaseAuth.currentUser.getIdToken()
  const opt = { ...options }

  if (!Object.prototype.hasOwnProperty.call(opt, "headers")) {
    opt.headers = {}
  }
  opt.headers.Authorization = token

  const response = await fetch(url, opt)
  if (response.status !== 200) {
    throw new Error(`Request failed with status ${response.status}.`)
  }
  const body = await response.json()

  if (body.error) {
    throw new Error(body.error)
  }

  return body
}

export default fetchWithError
