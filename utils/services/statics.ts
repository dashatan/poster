import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ListItem } from "../../components/organisms/SelectiveList"
import categoriesQuery from "../GraphQL/queries/categoriesQuery"
import citiesQuery from "../GraphQL/queries/citiesQuery"
import Category from "../types/Category"

const baseUrl = process.env.NEXT_PUBLIC_SERVICES_BASE_URL

export const statics = createApi({
  reducerPath: "statics",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
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
  }),
})

export const { useCategoriesQuery, useCitiesQuery } = statics
