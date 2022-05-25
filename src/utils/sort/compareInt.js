/* eslint-disable no-else-return */

function compareInt(a, b, order) {
  if (order === "asc") {
    if (a > b) return 1
    else if (a < b) return -1
    else return 0
  } else if (order === "desc") {
    if (a > b) return -1
    else if (a < b) return 1
    else return 0
  }
  return 0
}

export default compareInt
