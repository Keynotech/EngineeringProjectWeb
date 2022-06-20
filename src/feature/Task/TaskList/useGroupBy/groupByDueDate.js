/* eslint-disable no-unused-vars */
/* eslint-disable dot-notation */
/* eslint-disable no-lonely-if */
import { isPast, isToday } from "date-fns"
import { formatDateToDisplay } from "../../../../utils/dateConvert"
import i18n from "../../../../i18nextConf"

function groupByDueDate({ arr, key, nullKeyName }) {
  const sectionByPropertie = []

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
      if (isPast(date) && !isToday(date)) {
        const index = sectionByPropertie.findIndex(
          (section) => section.key === "overdue"
        )
        if (index !== -1) {
          sectionByPropertie[index].array.push(element)
        } else {
          sectionByPropertie.push({
            key: "overdue",
            name: i18n.t("task.overdue"),
            array: [element],
          })
        }
      } else {
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
    }
  })

  const overdue = []
  const withDate = []
  const withoutDate = []

  sectionByPropertie.forEach((section) => {
    if (section.key === null) {
      withoutDate.push(section)
    } else if (section.key === "overdue") {
      overdue.push(section)
    } else {
      withDate.push(section)
    }
  })
  withDate.sort((a, b) => a.key - b.key)

  return [...overdue, ...withDate, ...withoutDate]
}

export default groupByDueDate
