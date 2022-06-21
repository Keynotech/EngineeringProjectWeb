import { useEffect, useState } from "react"
import {
  isPast,
  isToday,
  isTomorrow,
  isThisWeek,
  isMonday,
  isTuesday,
  isWednesday,
  isThursday,
  isFriday,
  isSaturday,
  isSunday,
} from "date-fns"
import { formatDateToDisplay } from "../../../utils/dateConvert"

function useDatePropertie({ value }) {
  const [date, setDate] = useState(value)
  const [overdue, setIsOverdue] = useState(false)

  useEffect(() => {
    if (value) {
      const _date = new Date(value)

      if (isPast(_date)) {
        setIsOverdue(true)
        if (isToday(_date)) setDate("Today")
        else {
          setDate(formatDateToDisplay(value))
        }
      } else {
        setIsOverdue(false)
        if (isThisWeek(_date)) {
          if (isTomorrow(_date)) setDate("Tomorrow")
          else if (isMonday(_date)) setDate("Monday")
          else if (isTuesday(_date)) setDate("Tuesday")
          else if (isWednesday(_date)) setDate("Wednesday")
          else if (isThursday(_date)) setDate("Thursday")
          else if (isFriday(_date)) setDate("Friday")
          else if (isSaturday(_date)) setDate("Saturday")
          else if (isSunday(_date)) setDate("Sunday")
        } else setDate(formatDateToDisplay(value))
      }
    } else {
      setIsOverdue(false)
      setDate(null)
    }
  }, [value])

  return { date, overdue }
}

export default useDatePropertie
