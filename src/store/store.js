import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./features/layoutSlice"
import themeReducuer from "./features/themeSlice"
import tasksReducer from "./features/tasksSlice"

export default configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducuer,
    tasks: tasksReducer,
  },
})
