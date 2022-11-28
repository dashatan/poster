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

interface GqlMutationResponse {
  data: {}
  error: []
}

const baseUrl = "http://localhost:5000"

export const API = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // static
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

    //Auth
    login: builder.mutation<string, { data: FormData }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),

    // posts
    posts: builder.query<Post[], void>({
      query: postsQuery,
      transformResponse: (response: { data: { posts: Post[] } }) => {
        return response.data.posts
      },
    }),
    createPost: builder.mutation<Post, { data: PostObject }>({
      queryFn: async ({ data }) => {
        const api = baseUrl + "/post"
        return await axios
          .post(api, data)
          .then((res) => ({ data: res.data }))
          .catch((err) => ({ error: err.response.data }))
      },
    }),

    // files
    uploadTmpFile: builder.mutation<string, UploadTmpArgs>({
      queryFn: async ({ data, onUploadProgress }) => {
        const api = baseUrl + "/file/upload/tmp"
        return await axios
          .post(api, data, { onUploadProgress })
          .then((res) => ({ data: res.data }))
          .catch((err) => ({ error: err.response.data }))
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
  //static
  useCategoriesQuery,
  useCitiesQuery,

  //auth
  useLoginMutation,

  //posts
  usePostsQuery,
  useCreatePostMutation,

  //files
  useUploadTmpFileMutation,
  useRemoveTmpFileMutation,
} = API
