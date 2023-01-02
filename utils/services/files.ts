import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosProgressEvent } from "axios"
import { StringObj } from "utils/types"

interface UploadTmpArgs {
  data: FormData
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}

const baseUrl = "http://localhost:5000"

export const files = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({ baseUrl }),
  //TODO prepare headers - save authToken in redux store - reconsider useLocalStorage
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
    uploadFile: builder.mutation<string, UploadTmpArgs>({
      queryFn: async ({ data }) => {
        const api = baseUrl + "/file/upload"
        return await axios
          .post(api, data, {
            headers: {
              // Authorization: "Bearer " + authToken,
            },
          })
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

export const {
  useUploadTmpFileMutation,
  useRemoveTmpFileMutation,
  useUploadFileMutation,
} = files
