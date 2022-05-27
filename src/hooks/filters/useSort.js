/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import compareDate from "../../utils/sort/compareDate"
import compareInt from "../../utils/sort/compareInt"

function useSort({ data, sortOptions, onSortChange }) {
  const [sortDirection, setSortDirection] = useState("desc")
  const [sortKey, setSortKey] = useState(sortOptions[0].key)
  const [sortKeyType, setSortKeyType] = useState(sortOptions[0].type)

  const sortData = (arr) => {
    let res = []
    if (sortKeyType === "date") {
      const notNullList = []
      const nullList = []
      arr.forEach((elem) =>
        elem[sortKey] !== null ? notNullList.push(elem) : nullList.push(elem)
      )
      notNullList.sort((a, b) =>
        compareDate(a[sortKey], b[sortKey], sortDirection)
      )
      res = [...notNullList, ...nullList]
    } else if (sortKeyType === "int") {
      res = arr.sort((a, b) =>
        compareInt(a[sortKey], b[sortKey], sortDirection)
      )
    }
    return res
  }

  useEffect(() => {
    if (data?.length) {
      let sortedData = [...data]
      if (onSortChange) {
        sortedData = sortData(sortedData)
        onSortChange(sortedData)
      }
    }
  }, [data, sortDirection, sortKey])

  const handleSortKeyChange = (key, type) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortKeyType(type)
    }
  }

  const handleDirectionToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
  }

  return { handleDirectionToggle, handleSortKeyChange, sortDirection, sortKey }
}

export default useSort
