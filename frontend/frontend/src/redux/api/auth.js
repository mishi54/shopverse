import { createApi} from "@reduxjs/toolkit/query/react";
import {
  base_url,
  getAuthToken,
  login_url,
  register_url,
  logout_url,
} from "../../utils/apiUrls.js";
import { axiosBaseQuery } from "../../utils/axios";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery({ baseUrl: base_url }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: logout_url,
        method: 'POST',
        headers: {
          Authorization: getAuthToken(),
        },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: register_url,
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: login_url,
        method: "POST",
        body: data,
      }),
    }),
    
  }),
});

export const {
  useRegisterMutation,
  useLogoutMutation,
  useLoginMutation,
} = authApi;
