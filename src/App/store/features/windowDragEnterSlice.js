import { createSlice } from "@reduxjs/toolkit"

export const windowDragEnter = createSlice({
  name: "windowDragEnter",
  initialState: {
    isDragEnter: false,
  },
  reducers: {
    onDragEnter: (state) => {
      state.isDragEnter = true
    },
    onDragLeave: (state) => {
      state.isDragEnter = false
    },
  },
})
export const { onDragEnter, onDragLeave } = windowDragEnter.actions
export default windowDragEnter.reducer
