import { configureStore } from "@reduxjs/toolkit"
import sidebarReducer from "./features/sidebarSlice"
import themeReducuer from "./features/themeSlice"

export default configureStore({
  reducer: {
    sidebarVisibility: sidebarReducer,
    theme: themeReducuer,
  },
})
