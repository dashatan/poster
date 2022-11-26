import { createSlice } from "@reduxjs/toolkit"

export interface FormDataSliceInterface {
  post: { key: string; value: string }[]
  login: { email: string; password: string }
  signUp: { name: string; email: string; password: string }
}

export const initialState: FormDataSliceInterface = {
  post: [
    { key: "userId", value: "" },
    { key: "city", value: "" },
    { key: "category", value: "" },
    { key: "title", value: "" },
    { key: "description", value: "" },
    { key: "images", value: "" },
  ],
  login: { email: "", password: "" },
  signUp: { name: "", email: "", password: "" },
}

export const FormData = createSlice({
  name: "formData",
  initialState,
  reducers: {
    post: (state, action) => {
      state.post = action.payload
    },
    login: (state, action) => {
      state.login = action.payload
    },
    signUp: (state, action) => {
      state.signUp = action.payload
    },
  },
})

export const { post, login, signUp } = FormData.actions
export default FormData.reducer
