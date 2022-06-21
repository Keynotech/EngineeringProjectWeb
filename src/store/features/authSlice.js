import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    userToken: null,
  },
  reducers: {
    setUserToken: (state, token) => {
      state.userToken = token
    },
    removeUserToken: (state) => {
      state.userToken = null
    },
  },
})
export const { setUserToken, removeUserToken } = authSlice.actions
export default authSlice.reducer
