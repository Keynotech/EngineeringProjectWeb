import { createSlice } from "@reduxjs/toolkit"

export const sidebarSlice = createSlice({
  name: "sidebarVisibility",
  initialState: {
    value: true,
  },
  reducers: {
    show: (state) => {
      state.value = true
    },
    hide: (state) => {
      state.value = false
    },
    toggle: (state) => {
      state.value = !state.value
    },
  },
})
export const { hide, show, toggle } = sidebarSlice.actions
export default sidebarSlice.reducer
