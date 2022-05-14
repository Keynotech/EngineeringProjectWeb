import { createSlice } from "@reduxjs/toolkit"

export const tagEditSlice = createSlice({
  name: "tagEditPage",
  initialState: {
    visibility: false,
    tagId: null,
  },
  reducers: {
    showTagEdit: (state) => {
      state.visibility = true
    },
    hideTagEdit: (state) => {
      state.visibility = false
    },
    setTagEditId: (state, tagId) => {
      state.tagId = tagId
    },
  },
})
export const { setTagEditId, showTagEdit, hideTagEdit } = tagEditSlice.actions
export default tagEditSlice.reducer
