import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./features/layoutSlice"
import themeReducuer from "./features/themeSlice"
import tasksReducer from "./features/tasksSlice"
import tagEditPageReducer from "./features/tagEditPageSlice"
import windowDragEnterReducer from "./features/windowDragEnterSlice"

export default configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducuer,
    tasks: tasksReducer,
    windowDragEnter: windowDragEnterReducer,
    tagEditPage: tagEditPageReducer,
  },
})
