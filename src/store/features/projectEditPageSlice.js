import { createSlice } from "@reduxjs/toolkit"

export const projectEditSlice = createSlice({
  name: "projectEditSliceEditPage",
  initialState: {
    visibility: false,
    projectId: null,
  },
  reducers: {
    showProjectEdit: (state) => {
      state.visibility = true
    },
    hideProjectEdit: (state) => {
      state.visibility = false
    },
    setProjectEditId: (state, projectId) => {
      state.projectId = projectId
    },
  },
})
export const { setProjectEditId, showProjectEdit, hideProjectEdit } =
  projectEditSlice.actions
export default projectEditSlice.reducer
