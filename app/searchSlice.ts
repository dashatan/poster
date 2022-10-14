import { createSlice } from "@reduxjs/toolkit";

export interface SearchSliceInterface {
    text: string
}

const initialState: SearchSliceInterface = {
    text: ""
}; 

export const SearchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        text: (state, action) => {
            state.text = action.payload;
        },
    },
});

export const { text } = SearchSlice.actions;
export default SearchSlice.reducer;
