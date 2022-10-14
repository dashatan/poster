import { configureStore } from "@reduxjs/toolkit";
import { darkModeSlice } from "./darkModeSlice";
import { SearchSlice } from "./searchSlice";

export const store = configureStore({
    reducer: {
        [darkModeSlice.name]: darkModeSlice.reducer,
        [SearchSlice.name]: SearchSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
