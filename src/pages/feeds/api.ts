import { PaginatedResponse } from "common/hooks/pagination/usePagination";
import { challengeApi } from "api/challenge";
import { api } from "store/api";
import { stringifyParams } from "utils/stringifyParams";

export interface Media {
  type: "image" | "video";
  link: string;
}

interface User {
  teamName: string;
  firstName: string;
  lastName: string;
  profileType: string;
  sportType: string;
  avatar: string;
  email: string;
}

export interface Comment {
  post: number;
  comment: string;
  commentId: number;
  commentedBy: string;
  dateTime: string;
  user: {
    avatar: null;
    email: string;
  };
}

export interface PostPayload {
  content?: string;
  media?: Media[];
  challengeId?: number;
}

export type Post = PostPayload & {
  id: number;
  user: User;
  likes: number;
  creatives: number;
  commentCount: number;
  isLiked: boolean;
  isCreative: boolean;
  comments: Comment[];
  mediaUrls: Media[];
  postedAt: string;
  dateCreated: string;
};

export interface Response<T> {
  data: T;
  status: number;
  message: string;
}

export type ListPostResponse = PaginatedResponse<Post>;
export interface GetPostResponse {
  data: Post;
}
export type CreatePostResponse = GetPostResponse;

interface CommentPayload {
  postId: number;
  id: number;
  body: { content: string };
}

interface PageParams {
  page?: number;
  size?: number;
}

export const feedsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<CreatePostResponse, PostPayload>({
      query: (body: PostPayload) => ({
        url: "/api/v1/posts",
        method: "POST",
        body,
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.stale = true;
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              draft.stale = true;
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              draft.stale = true;
            })
          );

          if (body.challengeId) {
            dispatch(
              challengeApi.util.updateQueryData("getChallengeById", body.challengeId, (draft) => {
                draft.data.hasSubmitted = true;
              })
            );
          }
        } catch {
        } finally {
          await new Promise((resolve) => setTimeout(resolve, 2000));

          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              draft.stale = false;
              // draft.data.unshift(response.data.data)
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              draft.stale = false;
              // draft.data.unshift(response.data.data)
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              draft.stale = false;
              // draft.data.unshift(response.data.data)
            })
          );
        }
      },
    }),

    getPosts: builder.query<ListPostResponse, PageParams | undefined>({
      query: (params) => `/api/v1/posts/posts?${stringifyParams(params)}`,
      serializeQueryArgs: ({ endpointName }) => {
        // Ensures cache key is based on edpoint only to preserve merge
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
      // keepUnusedDataFor: 10,
      providesTags: () => [
        { type: "Post", id: "LSIT" },
        { type: "Post", id: "getPosts" },
      ],
    }),

    likePost: builder.mutation({
      query: (id: number) => ({
        url: `/api/v1/posts/${id}/like`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.likes = post.isLiked ? post.likes - 1 : (post.likes || 0) + 1;
              post.isLiked = !post.isLiked;
            }
          })
        );

        const patchUserPosts = dispatch(
          feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.likes = post.isLiked ? post.likes - 1 : (post.likes || 0) + 1;
              post.isLiked = !post.isLiked;
            }
          })
        );

        const patchCurrentUserPosts = dispatch(
          feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.likes = post.isLiked ? post.likes - 1 : (post.likes || 0) + 1;
              post.isLiked = !post.isLiked;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Mutation failed:", error);
          patchResult.undo();
          patchUserPosts.undo();
          patchCurrentUserPosts.undo();
        }
      },
    }),

    creativePost: builder.mutation({
      query: (id: number) => ({
        url: `/api/v1/posts/${id}/creative`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.creatives = post.isCreative ? post.creatives - 1 : (post.creatives || 0) + 1;
              post.isCreative = !post.isCreative;
            }
          })
        );

        const patchUserPosts = dispatch(
          feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.creatives = post.creatives ? post.creatives - 1 : (post.creatives || 0) + 1;
              post.isCreative = !post.isCreative;
            }
          })
        );

        const patchCurrentUserPosts = dispatch(
          feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
            const post = draft.data.find((post) => post.id === id);

            if (post) {
              post.creatives = post.isCreative ? post.creatives - 1 : (post.creatives || 0) + 1;
              post.isCreative = !post.isCreative;
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.error("Mutation failed:", error);
          patchResult.undo();
          patchUserPosts.undo();
          patchCurrentUserPosts.undo();
        }
      },
    }),

    editPost: builder.mutation({
      query: (id: number) => ({
        url: `/api/v1/posts/${id}`,
        method: "PUT",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          feedsApi.util.updateQueryData<"getPosts">("getPosts", undefined, (draft) => {
            const patch = draft.data.map((post) => {
              if (post.id == id) {
                return { ...post, content: post.content, mediaUrls: post.mediaUrls };
              }
              return post;
            });
            Object.assign(draft, patch);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    deletePost: builder.mutation({
      query: ({ id }: { id: number; challengeId: number | undefined }) => ({
        url: `/api/v1/posts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, challengeId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const index = draft.data.findIndex((post) => post.id === id);
              if (index !== -1) draft.data.splice(index, 1);
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              const index = draft.data.findIndex((post) => post.id === id);
              if (index !== -1) draft.data.splice(index, 1);
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              const index = draft.data.findIndex((post) => post.id === id);
              if (index !== -1) draft.data.splice(index, 1);
            })
          );

          if (challengeId) {
            dispatch(
              challengeApi.util.updateQueryData("getChallengeById", challengeId, (draft) => {
                draft.data.hasSubmitted = false;
              })
            );
          }
        } catch {}
      },
    }),

    getPostById: builder.query<Response<Post>, number>({
      query: (id) => `/api/v1/posts/${id}`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const response = await queryFulfilled;

          if (response.data.status == 404) {
            return;
          }

          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              let postIndex = draft.data.findIndex((post) => post.id == id);
              draft.data[postIndex] = response.data.data;
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              let postIndex = draft.data.findIndex((post) => post.id == id);
              draft.data[postIndex] = response.data.data;
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              let postIndex = draft.data.findIndex((post) => post.id == id);
              draft.data[postIndex] = response.data.data;
            })
          );
        } catch {}
      },
      providesTags: (res) => [
        { type: "Post", id: "DATA" },
        { type: "Post", id: res?.data?.id },
      ],
    }),

    getPostsByCurrentUser: builder.query<ListPostResponse, PageParams | undefined>({
      query: (params) => `/api/v1/posts/user-post?${stringifyParams(params)}`,
      serializeQueryArgs: ({ endpointName }) => {
        // Ensures cache key is based on edpoint only to preserve merge
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
        { type: "Post", id: "LIST" },
        { type: "Post", id: "getPostsByUser" },
        // { type: "Post", id: res?.data.user.email },
      ],
    }),

    getPostsByUser: builder.query<
      ListPostResponse,
      ({ email: string } & (PageParams | undefined)) | undefined
    >({
      query: (params) => `/api/v1/posts/other-feeds?${stringifyParams(params)}`,
      serializeQueryArgs: ({ endpointName }) => {
        // Ensures cache key is based on edpoint only to preserve merge
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
        { type: "Post", id: "LIST" },
        { type: "Post", id: "getPostsByUser" },
        // { type: "Post", id: res?.data.user.email },
      ],
    }),

    createPostComment: builder.mutation({
      query: (body: { postId: number; content: string }) => ({
        url: `/api/v1/posts/comment`,
        method: "POST",
        body,
      }),
      // invalidatesTags: (res, err, args)=> [{ type: "Post", id: args.postId}],
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        // dispatch(
        //   feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
        //     draft.stale = true;
        //   })
        // );

        try {
          await queryFulfilled;
          dispatch(feedsApi.endpoints.getPostById.initiate(body.postId, { forceRefetch: true }));
          // dispatch(
          //   feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
          //     draft.stale = false;
          //   })
          // );
        } catch {}
      },
    }),

    getPostComments: builder.query<ListPostResponse, void>({
      query: (id) => `/api/v1/posts/posts/${id}/comments`,
    }),

    editPostComment: builder.mutation<{ data: Comment }, CommentPayload>({
      query: ({ postId, id, body }: CommentPayload) => ({
        url: `/api/v1/posts/${postId}/comments/${id}`,
        method: "PUT",
        body,
      }),
      async onQueryStarted(payload, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === payload.postId);
              const comment = post?.comments.find((comment) => comment.commentId === payload.id);

              if (comment) {
                comment.comment = payload.body.content;
              }
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === payload.postId);
              const comment = post?.comments.find((comment) => comment.commentId === payload.id);

              if (comment) {
                comment.comment = payload.body.content;
              }
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === payload.postId);
              const comment = post?.comments.find((comment) => comment.commentId === payload.id);

              if (comment) {
                comment.comment = payload.body.content;
              }
            })
          );
        } catch {}
      },
    }),

    deletePostComment: builder.mutation({
      query: ({ id }: { postId: number; id: number }) => ({
        url: `/api/v1/posts/comments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted({ id, postId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            feedsApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === postId);

              if (post) {
                const commentIndex = post.comments.findIndex((comment) => comment.commentId === id);
                if (commentIndex !== -1) {
                  post.comments.splice(commentIndex, 1);
                  --post.commentCount;
                }
              }
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByUser", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === postId);

              if (post) {
                const commentIndex = post.comments.findIndex((comment) => comment.commentId === id);
                if (commentIndex !== -1) {
                  post.comments.splice(commentIndex, 1);
                  --post.commentCount;
                }
              }
            })
          );

          dispatch(
            feedsApi.util.updateQueryData("getPostsByCurrentUser", undefined, (draft) => {
              const post = draft.data.find((post) => post.id === postId);

              if (post) {
                const commentIndex = post.comments.findIndex((comment) => comment.commentId === id);
                if (commentIndex !== -1) {
                  post.comments.splice(commentIndex, 1);
                  --post.commentCount;
                }
              }
            })
          );
        } catch {}
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useLikePostMutation,
  useCreativePostMutation,
  useCreatePostCommentMutation,
  useGetPostsByCurrentUserQuery,
  useGetPostsByUserQuery,
  useLazyGetPostsByUserQuery,
  useGetPostByIdQuery,
  useGetPostCommentsQuery,
  useDeletePostMutation,
  useEditPostMutation,
  useDeletePostCommentMutation,
  useEditPostCommentMutation,
} = feedsApi;
