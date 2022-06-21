import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "./features/layoutSlice"
import themeReducuer from "./features/themeSlice"
import tasksReducer from "./features/tasksSlice"
import tagEditPageReducer from "./features/tagEditPageSlice"
import projectEditPageSlice from "./features/projectEditPageSlice"
import windowDragEnterReducer from "./features/windowDragEnterSlice"
import foldersSliceReducer from "./features/foldersSlice"

export default configureStore({
  reducer: {
    layout: layoutReducer,
    theme: themeReducuer,
    tasks: tasksReducer,
    windowDragEnter: windowDragEnterReducer,
    tagEditPage: tagEditPageReducer,
    projectEditPage: projectEditPageSlice,
    folders: foldersSliceReducer,
  },
})
