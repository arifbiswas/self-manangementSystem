// Need to use the React-specific entry point to import createApi

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints

interface IRowApi {
  success: boolean;
  rows: Array<string>;
}

export const rowsApi = createApi({
  reducerPath: "rowsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/rows" }),
  tagTypes: ["rows"],
  endpoints: (builder) => ({
    getRows: builder.query<IRowApi, string>({
      query: (id) => `/${id}`,
      providesTags: ["rows"],
    }),
    saveNewPost: builder.mutation({
      query: (postData) => ({
        url: ``,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["rows"],
    }),
    updatePost: builder.mutation({
      query: (postData) => ({
        url: `/${postData._id}`,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: ["rows"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["rows"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRowsQuery,
  useSaveNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = rowsApi;
