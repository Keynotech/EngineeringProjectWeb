import task from "../../../utils/types/task"

function groupByPriority({ arr, key }) {
  let sectionByPropertie = []

  task.forEach((elem) =>
    sectionByPropertie.push({ key: elem.value, name: elem.name, array: [] })
  )

  arr.forEach((element) => {
    const index = sectionByPropertie.findIndex(
      (section) => section.key === element[key]
    )
    sectionByPropertie[index].array.push(element)
  })
  sectionByPropertie = sectionByPropertie.filter(
    (element) => element.array.length > 0
  )
  sectionByPropertie.sort((a, b) => b.key - a.key)
  return sectionByPropertie
}

export default groupByPriority
