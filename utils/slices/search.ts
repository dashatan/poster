import { createSlice } from "@reduxjs/toolkit"

export interface SearchSliceInterface {
  text: string
  city: string
  category: string
}

const initialState: SearchSliceInterface = {
  text: "",
  city: "",
  category: "",
}

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    text: (state, action) => {
      state.text = action.payload
    },
    city: (state, action) => {
      state.city = action.payload
    },
    category: (state, action) => {
      state.category = action.payload
    },
  },
})

export const { text, category, city } = SearchSlice.actions
export default SearchSlice.reducer
