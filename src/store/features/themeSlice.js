import { createSlice } from "@reduxjs/toolkit"

export const theme = createSlice({
  name: "theme",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode
    },
  },
})
export const { toggleDarkMode } = theme.actions
export default theme.reducer
