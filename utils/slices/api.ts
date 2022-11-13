import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PostObject } from "../../pages/posts/create"
import createPost from "../gqlMutations/createPost"
import categoriesQuery from "../gqlQueries/categoriesQuery"
import postsQuery from "../gqlQueries/postsQuery"
import Category from "../types/Category"
import Post from "../types/Post"

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  endpoints: (builder) => ({
    posts: builder.query<Post[], void>({
      query: postsQuery,
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    categories: builder.query<Category[], void>({
      query: categoriesQuery,
      transformResponse: (response: { data: { categories: Category[] } }) => {
        return response.data.categories
      },
    }),
    createPost: builder.mutation<{}, PostObject>({
      query: createPost,
    }),
  }),
})

export const { usePostsQuery, useCategoriesQuery, useCreatePostMutation } = API
