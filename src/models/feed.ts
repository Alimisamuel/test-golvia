import { PaginatedResponse } from "./pagination";

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

export interface CreatePostPayload {
  content?: string;
  media?: Media[];
  challengeId?: number;
}

export type Post = CreatePostPayload & {
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

export type ListPostResponse = PaginatedResponse<Post>;

export interface GetPostResponse {
  data: Post;
}
export type CreatePostResponse = GetPostResponse;

export interface EditCommentRequest {
  postId: number;
  id: number;
  body: { content: string };
}