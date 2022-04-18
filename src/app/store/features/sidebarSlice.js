import { createSlice } from "@reduxjs/toolkit"

export const sidebarSlice = createSlice({
  name: "sidebarVisibility",
  initialState: {
    value: true,
  },
  reducers: {
    showSidebar: (state) => {
      state.value = true
    },
    hideSidebar: (state) => {
      state.value = false
    },
    toggleSidebar: (state) => {
      state.value = !state.value
    },
  },
})
export const { hideSidebar, showSidebar, toggleSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
