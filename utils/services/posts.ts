import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { RootState } from "utils/store"
import { PostObject } from "../GraphQL/mutations/createPost"
import postsQuery, { postsQueryArgs } from "../GraphQL/queries/postsQuery"
import postQuery, { postQueryArgs } from "utils/GraphQL/queries/postQuery"
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
    posts: builder.query<Post[], postsQueryArgs>({
      query: (args) => postsQuery(args),
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    post: builder.query<Post, postQueryArgs>({
      query: (args) => postQuery(args),
      transformResponse: (response: { data: { post: Post } }) => {
        return response.data.post
      },
    }),
    createPost: builder.mutation<Post, PostObject>({
      query: (body) => ({ url: "/post", method: "POST", body }),
    }),
  }),
})

const useLazyPostsQuery = posts.endpoints.posts.useLazyQuery

export { useLazyPostsQuery }
export const { usePostsQuery, useCreatePostMutation, usePostQuery } = posts
