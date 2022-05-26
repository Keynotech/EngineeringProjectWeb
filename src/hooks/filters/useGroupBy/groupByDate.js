/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable no-lonely-if */
import { formatDateToDisplay } from "../../../utils/dateConvert"

function groupByDate({ arr, key, nullKeyName }) {
  let sectionByPropertie = []

  arr.forEach((element) => {
    if (element[key] === null) {
      const index = sectionByPropertie.findIndex(
        (section) => section.key === null
      )
      if (index !== -1) {
        sectionByPropertie[index].array.push(element)
      } else {
        sectionByPropertie.push({
          key: null,
          name: nullKeyName,
          array: [element],
        })
      }
    } else {
      const date = new Date(element[key]).setHours(0, 0, 0, 0)
      const index = sectionByPropertie.findIndex(
        (section) => section.key === date
      )
      if (index !== -1) {
        sectionByPropertie[index].array.push(element)
      } else {
        sectionByPropertie.push({
          key: date,
          name: formatDateToDisplay(date),
          array: [element],
        })
      }
    }
  })
  const withDate = []
  const withoutDate = []

  sectionByPropertie.forEach((elem) =>
    elem.key !== null ? withDate.push(elem) : withoutDate.push(elem)
  )
  withDate.sort((a, b) => a.key - b.key)
  sectionByPropertie = [...withDate, ...withoutDate]
  return sectionByPropertie
}

export default groupByDate

/*


function groupByDate({ arr, key }) {
  const arrByPropertie = {}

  arr.forEach((element) => {
    if (element[key] === null) {
      if (Object.prototype.hasOwnProperty.call(arrByPropertie, "date")) {
        arrByPropertie["date"].push(element)
      } else {
        arrByPropertie["date"] = [element]
      }
    } else {
      const date = formatDateToDisplay(element[key])
      if (Object.prototype.hasOwnProperty.call(arrByPropertie, date)) {
        arrByPropertie[date].push(element)
      } else {
        arrByPropertie[date] = [element]
      }
    }
  })
  return arrByPropertie
}

*/
