import { createSlice } from "@reduxjs/toolkit"
import { ImageObject } from "../../components/molecules/inputs/ImageField"

export interface FormDataSliceInterface {
  post: { key: string; value: string }[]
  postImages: ImageObject[]
}

export const initialState: FormDataSliceInterface = {
  post: [
    { key: "category", value: "" },
    { key: "title", value: "" },
    { key: "description", value: "" },
    { key: "images", value: "" },
  ],
  postImages: [],
}

export const FormData = createSlice({
  name: "formData",
  initialState,
  reducers: {
    post: (state, action) => {
      state.post = action.payload
    },
    postImages: (state, action) => {
      state.postImages = action.payload
    },
  },
})

export const { post, postImages } = FormData.actions
export default FormData.reducer
