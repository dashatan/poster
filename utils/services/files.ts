import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import axios, { AxiosProgressEvent } from "axios"
import { RootState } from "utils/store"
import { StringObj } from "utils/types"

interface UploadTmpArgs {
  data: FormData
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
}

const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL

export const files = createApi({
  reducerPath: "files",
  baseQuery: fetchBaseQuery({ baseUrl }),
  //TODO prepare headers - save authToken in redux store - reconsider useLocalStorage
  endpoints: (builder) => ({
    uploadTmpFile: builder.mutation<string, UploadTmpArgs>({
      queryFn: async ({ data, onUploadProgress }, { getState }) => {
        const api = baseUrl + "/file/upload/tmp"
        return await axios
          .post(api, data, { onUploadProgress })
          .then((res) => ({ data: res.data }))
          .catch((err) => ({ error: err.response.data }))
      },
    }),
    uploadFile: builder.mutation<string, UploadTmpArgs>({
      queryFn: async ({ data }, { getState }) => {
        const token: string = (getState() as RootState).authSlice.authToken
        const api = baseUrl + "/file/upload"
        return await axios
          .post(api, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            return { data: res.data }
          })
          .catch((err) => ({
            status: 500,
            statusText: "upload error",
            data: err.response.data,
          }))
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
