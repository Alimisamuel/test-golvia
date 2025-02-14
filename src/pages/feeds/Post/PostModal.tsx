import { Box, Grid2 as Grid, Modal, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useRef } from "react";
import CommentItem from "../Comment/CommentItem";
import Carousel from "../Carousel";
import CommentField from "../Comment/CommentField";
import PostAvatarGroup from "./PostAvatarGroup";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostCounts from "./PostCounts";
import { Post } from "../api";
import useShowCounts from "../hooks/useShowCounts";

interface Props {
  post: Post;
  openModal: boolean;
  compact?: boolean | undefined;
  handleCloseModal: () => void;
  slideIndex?: number;
  setSlideIndex?: Dispatch<SetStateAction<number>>;
}

export default function PostModal(props: Props) {
  const { post, openModal, handleCloseModal, slideIndex, setSlideIndex, compact } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mediaGridRef = useRef<HTMLDivElement | null>(null);
  const { showCounts } = useShowCounts(post);

  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="post-modal"
      aria-describedby="post-modal-description"
    >
      <Grid
        container
        maxHeight={isMobile ? "85%" : "800px"}
        width={isMobile ? "95%" : "85%"}
        maxWidth={post.mediaUrls.length ? "1200px" : "800px"}
        className="w-[85%] h-[85%] relative bg-white rounded-t-[12px] rounded-b-[12px] overflow-hidden mr-auto ml-auto top-[8%]"
      >
        {!!post.mediaUrls.length && (
          <Grid
            ref={mediaGridRef}
            size={isMobile ? 12 : 7}
            height={isMobile ? "35%" : "100%"}
            display="flex"
            position="relative"
            alignItems="center"
            justifyContent="center"
            bgcolor={(theme) => theme.palette.blueMinus4}
            className="w-full h-full overflow-hidden"
          >
            <Box
              key={slideIndex}
              sx={{
                // backgroundImage: `url(${bgImage})`,
                transition: "background-image 0.5s ease-in-out",
                bgcolor: "#1b1f23",
              }}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center  z-0`}
            />
            <Carousel
              media={post.mediaUrls}
              perPage={1}
              fit="contain"
              isCurved={false}
              currentIndex={slideIndex}
              setSlideindex={setSlideIndex}
            />
          </Grid>
        )}
        <Grid
          size={isMobile || !post.mediaUrls.length ? 12 : 5}
          height={isMobile && post.mediaUrls.length ? "65%" : "100%"}
        >
          <Stack padding={3} pb={6} position="relative" height="100%" className="bg-white">
            {/* <div className="flex  items-center justify-between"> */}

            <PostAvatarGroup post={post} compact={compact} />
            {/* <IconButton onClick={handleCloseModal}>
          <MdOutlineClose />
         </IconButton>
            </div> */}
            <PostContent content={post.content} />
            <hr className="my-4" />
            <Box height="100%" overflow="scroll" className="scrollbar-none">
              {showCounts && (
                <>
                  <PostCounts
                    likes={post.likes}
                    creatives={post.creatives}
                    comments={post.commentCount}
                    challengeId={post.challengeId}
                  />
                  <hr className="my-4" />
                </>
              )}
              <PostActions post={post} />
              <hr className="my-4" />

              <Stack spacing={3} pb={3.5}>
                {post.comments &&
                  post.comments.map((comment) => (
                    <CommentItem key={comment.commentId} comment={comment} postId={post.id} />
                  ))}
              </Stack>
            </Box>

            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              pb={2}
              px="inherit"
              className="bg-white"
            >
              <hr className="mb-4 mt-2" />
              <CommentField postId={post.id} />
            </Box>
          </Stack>
          {/* <button className="absolute top-2 right-2" onClick={handleCloseModal}>
              <IoMdClose className=" text-2xl" />
            </button> */}
        </Grid>
      </Grid>
    </Modal>
  );
}
