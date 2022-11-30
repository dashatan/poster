import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { PostObject } from "../GraphQL/mutations/createPost"
import postsQuery from "../GraphQL/queries/postsQuery"
import Post from "../types/Post"

const baseUrl = "http://localhost:5000"

export const posts = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    posts: builder.query<Post[], void>({
      query: postsQuery,
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    createPost: builder.mutation<Post, PostObject>({
      query: (body) => ({ url: "/post", method: "POST", body }),
    }),
  }),
})

export const { usePostsQuery, useCreatePostMutation } = posts
