import { createSlice } from "@reduxjs/toolkit"

export const layoutSlice = createSlice({
  name: "layoutState",
  initialState: {
    sidebarVisibility: true,
    taskPageVisibility: false,
    taskInputVisibility: false,
    tagInputVisibility: false,
    projectInputVisibility: false,
    folderInputVisibility: false,
    quickFindVisibility: false,
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
    showTaskInput: (state) => {
      state.taskInputVisibility = true
    },
    hideTaskInput: (state) => {
      state.taskInputVisibility = false
    },
    showTagInput: (state) => {
      state.tagInputVisibility = true
    },
    hideTagInput: (state) => {
      state.tagInputVisibility = false
    },
    hideProjectInput: (state) => {
      state.projectInputVisibility = false
    },
    showProjectInput: (state) => {
      state.projectInputVisibility = true
    },
    hideFolderInput: (state) => {
      state.folderInputVisibility = false
    },
    showFolderInput: (state) => {
      state.folderInputVisibility = true
    },
    hideQuickFind: (state) => {
      state.quickFindVisibility = false
    },
    showQuickFind: (state) => {
      state.quickFindVisibility = true
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
  showTaskInput,
  hideTaskInput,
  showTagInput,
  hideTagInput,
  hideProjectInput,
  showProjectInput,
  hideFolderInput,
  showFolderInput,
  hideQuickFind,
  showQuickFind,
} = layoutSlice.actions
export default layoutSlice.reducer
