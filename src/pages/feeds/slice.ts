import { Post } from "./api";

export interface AuthState {
  data: Post | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}
