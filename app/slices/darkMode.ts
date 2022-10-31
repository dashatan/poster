import { createSlice } from "@reduxjs/toolkit";

export interface darkModeState {
    isDark: boolean
}

const initialState: darkModeState = {
    isDark: false
}; 

export const darkModeSlice = createSlice({
    name: "darkMode",
    initialState,
    reducers: {
        darkMode: (state, action) => {
            state.isDark = action.payload;
        },
    },
});

export const { darkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
