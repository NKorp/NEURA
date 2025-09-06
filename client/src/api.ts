import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type LaunchCore = {
  flight_number: number;
  launch_name: string;
  launch_date: string;
};

export type SavedLaunch = LaunchCore & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  tagTypes: ["Saved"],
  endpoints: (builder) => ({
    getLatestLaunches: builder.query<LaunchCore[], void>({
      query: () => "launches/latest",
    }),
    saveLaunch: builder.mutation<SavedLaunch, LaunchCore>({
      query: (launch) => ({
        url: "launches/save",
        method: "POST",
        body: launch,
      }),
      invalidatesTags: ["Saved"],
    }),
    getSavedLaunches: builder.query<SavedLaunch[], void>({
      query: () => "launches/saved",
      providesTags: ["Saved"],
    }),
    removeLaunch: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `launches/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Saved"],
    }),
  }),
});

export const {
  useGetLatestLaunchesQuery,
  useGetSavedLaunchesQuery,
  useSaveLaunchMutation,
  useRemoveLaunchMutation,
} = api;
