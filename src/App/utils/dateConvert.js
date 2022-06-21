/* eslint-disable import/prefer-default-export */
import { format, isSameQuarter } from "date-fns"

function convertDateToJS(value) {
  return new Date(value)
}

function formatDateToDisplay(value) {
  const date = convertDateToJS(value)
  let res = null
  if (isSameQuarter(date, new Date())) {
    res = format(date, "LLL do")
  } else {
    res = format(date, "LLL do yyyy")
  }
  return res
}

function formatDateTimeToDisplay(value) {
  const date = convertDateToJS(value)
  return format(date, "LLL do, p")
}

export { convertDateToJS, formatDateToDisplay, formatDateTimeToDisplay }
