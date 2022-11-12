import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
    uploadImages: builder.mutation<{}, FormData>({
      query: (body) => ({
        url: "/upload/images",
        method: "POST",
        body,
      }),
    }),
  }),
})

export const { usePostsQuery, useCategoriesQuery, useUploadImagesMutation } =
  API
