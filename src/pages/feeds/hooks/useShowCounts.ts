import { Post } from "pages/feeds/api";
import { useMemo } from "react";

export default function useShowCounts(post: Post) {
  const showCounts = useMemo(
    () => !!(post.likes || post.commentCount || post.creatives),
    [post.likes, post.commentCount, post.creatives]
  );

  return {
    showCounts,
  };
}
