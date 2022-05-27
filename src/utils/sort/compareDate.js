/* eslint-disable no-else-return */
import { compareAsc, compareDesc, parseISO } from "date-fns"

function compareDate(a, b, order) {
  if (order === "desc") {
    return compareDesc(parseISO(a), parseISO(b))
  } else if (order === "asc") {
    return compareAsc(parseISO(a), parseISO(b))
  }
  return 0
}

export default compareDate
