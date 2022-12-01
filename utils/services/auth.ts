import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import userQuery from "../GraphQL/queries/userQuery"
import { StringObj } from "../types"

export interface User {
  name: string
  email: string
  avatar: string
}

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
    user: builder.query<User, string>({
      query: (id) => userQuery({ id }),
      transformResponse: (res: { data: { user: User } }) => res.data.user,
    }),
  }),
})
const useLazyUserQuery = auth.endpoints.user.useLazyQuery
export { useLazyUserQuery }
export const { useLoginMutation, useSignupMutation } = auth
