import { PageParams, PaginatedResponse } from "common/hooks/pagination/usePagination";
import { api } from "store/api";
import { stringifyParams } from "utils/stringifyParams";

export interface Challenge {
  id: number;
  title: string;
  mediaType: "IMAGE" | "VIDEO";
  description: string;
  sponsors: string[];
  hasJoined: boolean;
  hasSubmitted: boolean;
  startDate: string;
  endDate: string;
}

export interface Leaderboard {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    profileImageUrl: string | null;
    connections: number;
  };
  creatives: number;
  likes: number;
}

export interface ChallengeResponse {
  data: Challenge;
}

export const challengeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChallengeById: builder.query<ChallengeResponse, number>({
      query: (id) => `/api/challenges/${id}`,
    }),
    joinChallenge: builder.query<string, number>({
      query: (id) => `/api/challenges/${id}/join`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            challengeApi.util.updateQueryData("getChallengeById", id, (draft) => {
              draft.data.hasJoined = true;
            })
          );

          dispatch(
            challengeApi.util.updateQueryData(
              "getLeaderboard",
              { id, params: undefined },
              (draft) => {
                draft.stale = true;
              }
            )
          );
        } catch {}
      },
    }),
    getLeaderboard: builder.query<
      PaginatedResponse<Leaderboard>,
      { id: number; params: PageParams | undefined }
    >({
      query: ({ id, params }) => `/api/challenges/${id}/leaderboard?${stringifyParams(params)}`,
      serializeQueryArgs: ({ endpointName }) => {
        return { endpointName };
      },
      merge: (currentCache, newData) => {
        if (newData.pagination.currentPage == 1) {
          Object.assign(currentCache, newData);
          return;
        }

        if (currentCache?.data && newData?.data) {
          currentCache.data.push(...newData.data);
        } else {
          Object.assign(currentCache, newData); // Initialize cache if it’s the first page
        }
      },
      providesTags: () => [
        { type: "Post", id: "LSIT" },
        { type: "Post", id: "getLeaderboard" },
      ],
    }),
  }),
});

export const {
  useGetChallengeByIdQuery,
  useLazyGetChallengeByIdQuery,
  useGetLeaderboardQuery,
  useLazyGetLeaderboardQuery,
  useLazyJoinChallengeQuery,
} = challengeApi;
