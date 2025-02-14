import { Avatar, Box, Stack } from "@mui/material";
// import { IoMdClose } from "react-icons/io";
import { useRef, useState } from "react";
import { Post } from "../api";
import CommentItem from "../Comment/CommentItem";
import useAuthDetails from "pages/auth/useAuthDetails";
import Carousel from "../Carousel";
import CommentField from "../Comment/CommentField";
import PostAvatarGroup from "./PostAvatarGroup";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostCounts from "./PostCounts";
import PostModal from "./PostModal";
import useShowCounts from "../hooks/useShowCounts";

export interface Props {
  post: Post;
  compact?: boolean;
}

export default function FeedItem({ post, compact }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [showCommentPreview, setShowCommentPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { asset } = useAuthDetails();
  const { showCounts } = useShowCounts(post);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMediaClick = (index: number) => {
    setOpenModal(true);
    setSlideIndex(index);
  };

  return (
    <Box
      ref={containerRef}
      py={compact ? 1 : 3}
      px={compact ? 0 : 2}
      className="mt-2 bg-white rounded-2xl px-4 py-6 "
      style={{ border: !compact ? "0.5px solid #dfdeda" : "none" }}
    >
      <PostAvatarGroup post={post} compact={compact} />

      <PostContent content={post.content} />

      <div className="mt-3" />
      {post.mediaUrls[0] && (
        <Carousel
          media={post.mediaUrls}
          onMediaClick={handleMediaClick}
          maxHeight={650}
          hashTag={!!post.challengeId ? "#CelebrateYourCountryChallenge" : undefined}
        />
      )}

      {showCounts && (
        <>
          <PostCounts
            likes={post.likes}
            creatives={post.creatives}
            comments={post.commentCount}
            challengeId={post.challengeId}
            marginTop={3}
            onDetailsClick={() => setOpenModal(true)}
          />
          <hr className="my-4" />
        </>
      )}

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mt={!showCounts ? 3 : 0}
        px={compact ? 4 : 0}
      >
        {!compact && (
          <Avatar src={asset?.profilePictureUrl} alt="user" sx={{ width: 34, height: 34 }} />
        )}
        <PostActions post={post} openComments={() => setShowCommentPreview(true)} />
      </Stack>

      {showCommentPreview && (
        <>
          <hr className="my-4" />
          <Stack spacing={2}>
            {post.comments.slice(0, 2).map((comment) => (
              <CommentItem key={comment.commentId} comment={comment} postId={post.id} hideName />
            ))}
            <CommentField postId={post.id} showSubmit />
          </Stack>
        </>
      )}

      {compact && <hr className="my-4" />}

      <PostModal
        post={post}
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        slideIndex={slideIndex}
        setSlideIndex={setSlideIndex}
        compact={compact}
      />
    </Box>
  );
}
