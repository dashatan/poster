import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios, { AxiosProgressEvent } from "axios"
import createPost, { PostObject } from "../gqlMutations/createPost"
import categoriesQuery from "../gqlQueries/categoriesQuery"
import postsQuery from "../gqlQueries/postsQuery"
import Category from "../types/Category"
import Post from "../types/Post"

interface UploadTmpArgs {
  data: FormData
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
}

const baseUrl = "http://localhost:5000"

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
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
    uploadTmpFile: builder.mutation<string, UploadTmpArgs>({
      queryFn: async ({ data, onUploadProgress }) => {
        const api = baseUrl + "/file/upload/tmp"
        return await axios
          .post(api, data, { onUploadProgress })
          .then((res) => ({ data: `${baseUrl}/${res.data}` }))
          .catch((err) => ({ error: err.message }))
      },
    }),
    removeTmpFile: builder.mutation<{ success: boolean; message: string }, string>({
      query: (path) => ({
        url: "/file/remove/tmp/" + path.split("/").pop(),
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  usePostsQuery,
  useCategoriesQuery,
  useCreatePostMutation,
  useUploadTmpFileMutation,
  useRemoveTmpFileMutation,
} = API
