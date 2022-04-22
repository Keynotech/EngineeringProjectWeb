import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from "./features/sidebarSlice"
import themeReducuer from "./features/themeSlice"
import tasksReducer from "./features/tasksSlice"

export default configureStore({
  reducer: {
    sidebarVisibility: sidebarReducer,
    theme: themeReducuer,
    tasks: tasksReducer,
  },
})
