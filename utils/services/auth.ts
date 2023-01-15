import { createSlice } from "@reduxjs/toolkit"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import userQuery from "../GraphQL/queries/userQuery"
import { StringObj } from "../types"

export interface User {
  name: string
  email: string
  avatar: string
}
const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL

export const auth = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["User", "Auth"],
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
      providesTags: ["User"],
    }),
    userUpdate: builder.mutation<User, StringObj>({
      query: (body) => ({ url: "/user", method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),
    userDelete: builder.mutation<User, StringObj>({
      query: (body) => ({ url: "/user", method: "DELETE", body }),
      invalidatesTags: ["User"],
    }),
  }),
})

export const authSlice = createSlice({
  initialState: { authToken: "" },
  name: "authSlice",
  reducers: {
    authToken: (state, action) => {
      state.authToken = action.payload
    },
  },
})

const useLazyUserQuery = auth.endpoints.user.useLazyQuery

export { useLazyUserQuery }
export const { useLoginMutation, useSignupMutation, useUserUpdateMutation } = auth
