// Need to use the React-specific entry point to import createApi
import { ICollection } from "@/app/(serverSetupLayout)/setup/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ICollectionApi {
  success: boolean;
  collections: Array<ICollection>;
}
interface ICollectionSingle {
  success: boolean;
  collection: ICollection;
}

// Define a service using a base URL and expected endpoints
export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/collections" }),
  tagTypes: ["collections"],
  endpoints: (builder) => ({
    getCollectoins: builder.query<ICollectionApi, string>({
      query: () => ``,
      providesTags: ["collections"],
    }),
    getCollectoin: builder.query<ICollectionSingle, any>({
      query: (id: string) => `/${id}`,
    }),
    saveNewPost: builder.mutation({
      query: (postData) => ({
        url: ``,
        method: "POST",
        body: postData,
      }),
      invalidatesTags: ["collections"],
    }),
    updatePost: builder.mutation({
      query: (postData) => ({
        url: ``,
        method: "PATCH",
        body: postData,
      }),
      invalidatesTags: ["collections"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["collections"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCollectoinsQuery,
  useGetCollectoinQuery,
  useSaveNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = collectionApi;
