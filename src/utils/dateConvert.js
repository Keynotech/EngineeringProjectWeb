/* eslint-disable import/prefer-default-export */
import { format } from "date-fns"

function convertDateToJS(value) {
  return new Date(value)
}

function formatDateToDisplay(value) {
  const date = convertDateToJS(value)
  return format(date, "LLL eo, p")
}

export { convertDateToJS, formatDateToDisplay }
