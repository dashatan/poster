import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { API } from "./slices/api"
import { authSlice } from "./slices/auth"
import { darkModeSlice } from "./slices/darkMode"
import { FormData } from "./slices/formData"
import { SearchSlice } from "./slices/search"

export const store = configureStore({
  reducer: {
    [darkModeSlice.name]: darkModeSlice.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
    [FormData.name]: FormData.reducer,
    [authSlice.name]: authSlice.reducer,
    [API.reducerPath]: API.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(API.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
