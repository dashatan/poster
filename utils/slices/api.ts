import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios, { AxiosProgressEvent } from "axios"
import { PostObject } from "../../pages/posts/create"
import createPost from "../gqlMutations/createPost"
import categoriesQuery from "../gqlQueries/categoriesQuery"
import postsQuery from "../gqlQueries/postsQuery"
import Category from "../types/Category"
import Post from "../types/Post"
const baseUrl = "http://localhost:5000"

interface UploadTmpArgs {
  data: FormData
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
}

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
    uploadTmp: builder.mutation<string, UploadTmpArgs>({
      queryFn: ({ data, onUploadProgress }) => {
        const api = baseUrl + "/upload/tmp"
        const res = axios
          .post(api, data, {
            onUploadProgress,
          })
          .then((res) => ({ data: baseUrl + "/tmp/" + res.data.filename }))
          .catch((err) => ({ error: err }))
        return res
      },
    }),
  }),
})

export const {
  usePostsQuery,
  useCategoriesQuery,
  useCreatePostMutation,
  useUploadTmpMutation,
} = API
