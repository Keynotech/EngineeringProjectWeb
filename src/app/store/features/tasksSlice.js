import { createSlice } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    displayDetails: false,
    isTaskInputOpen: false,
  },
  reducers: {
    toggleDisplayDetails: (state) => {
      state.displayDetails = !state.displayDetails
    },
    showTaskInput: (state) => {
      state.isTaskInputOpen = true
    },
    hideTaskInput: (state) => {
      state.isTaskInputOpen = false
    },
  },
})
export const { toggleDisplayDetails, showTaskInput, hideTaskInput } =
  tasksSlice.actions
export default tasksSlice.reducer
