import { createSlice } from "@reduxjs/toolkit"

export const foldersSlice = createSlice({
  name: "foldersSlice",
  initialState: {
    foldersEditVisibility: false,
    editPageFolderId: null,
  },
  reducers: {
    showFolderEdit: (state) => {
      state.foldersEditVisibility = true
    },
    hideFolderEdit: (state) => {
      state.foldersEditVisibility = false
    },
    setFolderEditId: (state, folderId) => {
      state.editPageFolderId = folderId
    },
  },
})
export const { setFolderEditId, showFolderEdit, hideFolderEdit } =
  foldersSlice.actions
export default foldersSlice.reducer
