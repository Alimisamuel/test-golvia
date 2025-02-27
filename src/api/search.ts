import { api } from "store/api";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  profileType: string | null;
  sportType: string | null;
  teamName: string | null;
  active: boolean;
  profilePictureUrl: string;
  profileRealUrl: string | null;
}

export interface SearchResponse {
  data: User[];
  stale: boolean;
}

const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSearch: builder.query<SearchResponse, string>({
      query: (query) => `/api/search?query=${query}`,
    }),
  }),
});

export const { useGetSearchQuery, useLazyGetSearchQuery } = searchApi;
