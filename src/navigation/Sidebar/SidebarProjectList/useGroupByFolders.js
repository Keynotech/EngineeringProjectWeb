function useGroupByFolders(folders, projects) {
  const sectionByFolders = [
    {
      key: null,
      name: null,
      array: [],
    },
  ]

  folders?.forEach((folder) => {
    sectionByFolders.push({
      key: folder._id,
      name: folder.folderName,
      array: [],
    })
  })

  projects?.forEach((project) => {
    if (project.folder === null || project.folder === undefined) {
      const index = sectionByFolders.findIndex(
        (section) => section.key === null
      )
      sectionByFolders[index].array.push(project)
    } else {
      const index = sectionByFolders.findIndex(
        (section) => section.key === project.folder
      )
      sectionByFolders[index].array.push(project)
    }
  })
  return sectionByFolders
}

export default useGroupByFolders
