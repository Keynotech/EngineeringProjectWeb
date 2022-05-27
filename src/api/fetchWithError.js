async function fetchWithError(url, options) {
  const response = await fetch(url, options)

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
