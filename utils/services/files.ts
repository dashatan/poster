import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosProgressEvent } from "axios"

interface UploadTmpArgs {
  data: FormData
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
}

const baseUrl = "http://localhost:5000"

export const files = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
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
  }),
})

export const { useUploadTmpFileMutation, useRemoveTmpFileMutation } = files
