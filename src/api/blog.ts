import { Response } from "models/base";
import { Blog } from "models/blog";
import { PaginatedResponse } from "models/pagination";
import { api } from "store/api";

const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBlog: builder.query<PaginatedResponse<Blog>, null>({
      query: () => `/api/v1/blog`,
    }),

    getBlogById: builder.query<Response<Blog>, number>({
      query: (id) => `/api/v1/blog/${id}`,
    }),
  }),
});

export const { useGetBlogQuery, useGetBlogByIdQuery } = blogApi;