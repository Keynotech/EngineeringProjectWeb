import { createSlice } from "@reduxjs/toolkit"

export const layoutSlice = createSlice({
  name: "layoutState",
  initialState: {
    sidebarVisibility: true,
    taskPageVisibility: false,
  },
  reducers: {
    showSidebar: (state) => {
      state.sidebarVisibility = true
    },
    hideSidebar: (state) => {
      state.sidebarVisibility = false
    },
    toggleSidebar: (state) => {
      state.sidebarVisibility = !state.sidebarVisibility
    },
    showTaskPage: (state) => {
      state.taskPageVisibility = true
    },
    hideTaskPage: (state) => {
      state.taskPageVisibility = false
    },
    toggleTaskPage: (state) => {
      state.taskPageVisibility = !state.taskPageVisibility
    },
  },
})
export const {
  hideSidebar,
  showSidebar,
  toggleSidebar,
  showTaskPage,
  hideTaskPage,
  toggleTaskPage,
} = layoutSlice.actions
export default layoutSlice.reducer
