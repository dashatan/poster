import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoggedIn: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const { isLoggedIn } = authSlice.actions
export default authSlice.reducer
