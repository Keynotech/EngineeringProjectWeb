/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable no-lonely-if */
import { formatDateToDisplay } from "../../../../utils/dateConvert"

function groupByCreatedDate({ arr, key }) {
  const sectionByPropertie = []

  arr.forEach((element) => {
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
  })

  sectionByPropertie.sort((a, b) => a.key - b.key)
  return sectionByPropertie
}

export default groupByCreatedDate
