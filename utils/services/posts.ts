import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RootState } from "utils/store"
import { PostObject } from "../GraphQL/mutations/createPost"
import postsQuery, { postQueryArgs } from "../GraphQL/queries/postsQuery"
import Post from "../types/Post"

const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL

export const posts = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).authSlice.authToken

      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: (builder) => ({
    posts: builder.query<Post[], postQueryArgs>({
      query: (args) => postsQuery(args),
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    createPost: builder.mutation<Post, PostObject>({
      query: (body) => ({ url: "/post", method: "POST", body }),
    }),
  }),
})

const useLazyPostsQuery = posts.endpoints.posts.useLazyQuery

export { useLazyPostsQuery }
export const { usePostsQuery, useCreatePostMutation } = posts
