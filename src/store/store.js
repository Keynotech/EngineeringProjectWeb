import { configureStore } from "@reduxjs/toolkit"
import layoutReducer from "../App/store/features/layoutSlice"
import themeReducuer from "../App/store/features/themeSlice"
import tasksReducer from "../App/store/features/tasksSlice"
import tagEditPageReducer from "../App/store/features/tagEditPageSlice"
import projectEditPageSlice from "../App/store/features/projectEditPageSlice"
import windowDragEnterReducer from "../App/store/features/windowDragEnterSlice"
import foldersSliceReducer from "../App/store/features/foldersSlice"

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
