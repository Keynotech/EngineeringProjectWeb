import { createSlice } from "@reduxjs/toolkit"

export const tasksSlice = createSlice({
  name: "sidebarVisibility",
  initialState: {
    displayDetails: false,
  },
  reducers: {
    toggleDisplayDetails: (state) => {
      state.displayDetails = !state.displayDetails
    },
  },
})
export const { toggleDisplayDetails } = tasksSlice.actions
export default tasksSlice.reducer
