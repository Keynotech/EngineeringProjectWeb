import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./features/layoutSlice"
import themeReducuer from "./features/themeSlice"
import tasksReducer from "./features/tasksSlice"
import windowDragEnterReducer from "./features/windowDragEnterSlice"

export default configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducuer,
    tasks: tasksReducer,
    windowDragEnter: windowDragEnterReducer,
  },
})
