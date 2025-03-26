import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { keys } from "./keys"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://trackapi.nutritionix.com",
  prepareHeaders: (headers, { getState }) => {
    const apiKey = keys.X_APP_KEY
    const appId = keys.X_APP_ID
    if (apiKey && appId) {
      headers.set("x-app-id", appId)
      headers.set("x-app-key", apiKey)
    }
    return headers
  },
})

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: builder => ({
    search: builder.query<any, string>({
      query: searchPhrase => `/v2/search/instant?query=${searchPhrase}`,
    }),
  }),
})

export const { useSearchQuery } = api
