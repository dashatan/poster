import { configureStore } from "@reduxjs/toolkit";
import { darkModeSlice } from "./darkModeSlice";

export const store = configureStore({
    reducer: {
        [darkModeSlice.name]: darkModeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
