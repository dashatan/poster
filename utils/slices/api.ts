import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import axios, { AxiosProgressEvent } from "axios"
import { ListItem } from "../../components/templates/phone/SelectiveList"
import createPost, { PostObject } from "../gqlMutations/createPost"
import categoriesQuery from "../gqlQueries/categoriesQuery"
import citiesQuery from "../gqlQueries/citiesQuery"
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
    // staticAPIs
    categories: builder.query<Category[], void>({
      query: categoriesQuery,
      transformResponse: (response: { data: { categories: Category[] } }) => {
        return response.data.categories
      },
    }),
    cities: builder.query<ListItem[], void>({
      query: citiesQuery,
      transformResponse: (response: { data: { cities: ListItem[] } }) => {
        return response.data.cities
      },
    }),

    // postAPIs
    posts: builder.query<Post[], void>({
      query: postsQuery,
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    createPost: builder.mutation<{}, PostObject>({
      query: (body) => ({
        url: baseUrl + createPost(body),
        method: "POST",
      }),
    }),

    // fileAPIs
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

    // END OF APIs
  }),
})

export const {
  useCategoriesQuery,
  useCitiesQuery,
  usePostsQuery,
  useCreatePostMutation,
  useUploadTmpFileMutation,
  useRemoveTmpFileMutation,
} = API
