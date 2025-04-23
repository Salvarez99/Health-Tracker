import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "https://trackapi.nutritionix.com",
  prepareHeaders: (headers, { getState }) => {
    const apiKey = process.env.EXPO_PUBLIC_X_APP_KEY
    const appId = process.env.EXPO_PUBLIC_X_APP_ID
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
    instantSearch: builder.query<any, string>({
      query: (searchPhrase: string) => ({
        url: `/v2/search/instant?query=${searchPhrase}`,
        method: "GET",
      }),
    }),
    naturalLanguage: builder.query({
      query: (item_name: string) => ({
        url: "/v2/natural/nutrients",
        method: "POST",
        body: { query: item_name },
      }),
    }),
    brandLookup: builder.query({
      query: ({
        barcode,
        type,
      }: {
        barcode: string
        type: "nix_item_id" | "upc" | "rw_sin"
      }) => ({
        url: `/v2/search/item?${type}=${barcode}`,
        method: "GET",
      }),
    }),
    barcodeLookup: builder.query({
      query: (barcode: string) => ({
        url: `/v2/search/item?upc=${barcode}`,
        method: "GET",
      }),
    }),
  }),
})

export const {
  useInstantSearchQuery,
  useNaturalLanguageQuery,
  useBrandLookupQuery,
  useBarcodeLookupQuery,
} = api
