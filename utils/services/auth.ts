import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { StringObj } from "../types"

const baseUrl = "http://localhost:5000"

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation<string, StringObj>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    signup: builder.mutation<string, StringObj>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = auth
