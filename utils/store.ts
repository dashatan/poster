import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { auth, authSlice } from "./services/auth"
import { files } from "./services/files"
import { posts } from "./services/posts"
import { statics } from "./services/statics"
import { FormData } from "./slices/formData"
import { SearchSlice } from "./slices/search"

export const store = configureStore({
  reducer: {
    //slices
    [authSlice.name]: authSlice.reducer,
    [SearchSlice.name]: SearchSlice.reducer,
    [FormData.name]: FormData.reducer,

    //services
    [auth.reducerPath]: auth.reducer,
    [posts.reducerPath]: posts.reducer,
    [statics.reducerPath]: statics.reducer,
    [files.reducerPath]: files.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(auth.middleware)
      .concat(posts.middleware)
      .concat(files.middleware)
      .concat(statics.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
