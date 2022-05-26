import { createSlice } from "@reduxjs/toolkit"

export const projectEditSlice = createSlice({
  name: "projectEditSliceEditPage",
  initialState: {
    visibility: false,
    tagId: null,
  },
  reducers: {
    showProjectEdit: (state) => {
      state.visibility = true
    },
    hideProjectEdit: (state) => {
      state.visibility = false
    },
    setProjectEditId: (state, tagId) => {
      state.tagId = tagId
    },
  },
})
export const { setProjectEditId, showProjectEdit, hideProjectEdit } =
  projectEditSlice.actions
export default projectEditSlice.reducer
