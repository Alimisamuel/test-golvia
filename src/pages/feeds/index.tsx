import AccessLayout from "layouts/AccessLayout";
import { PATHS } from "Routes/path";
import FeedLayout from "layouts/FeedLayout";
import {
  Box,
  Divider,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetPostByIdQuery, useLazyGetPostsQuery } from "./api";
import useAuthDetails from "pages/auth/useAuthDetails";
import FeedItem from "./Post";
import FeedPost from "./FeedPost";
import CompleteProfileModal from "components/modals/CompleteProfileModal";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HeaderHeight } from "constants/layers";
// import joinChallenge from "assets/imgs/join-challenge.webp";
import InfiniteScroll from "common/InfiniteScroll";
import usePagination from "common/hooks/pagination/usePagination";
import { useGetChallengeByIdQuery } from "api/challenge";
import useAlert from "components/alert/useAlert";
import PostModal from "./Post/PostModal";
import ChallengePostPromptModal from "./ChallangePostPromptModal";
import Head from "common/Head";
// import { ReactComponent as LeaderboardIcon } from "assets/icons/leaderboard.svg";

const FetchLoader = () => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-4">
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-gv-greyMinus2_DCE1EC rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

const Feed = () => {
  const [_trigger, _result] = useLazyGetPostsQuery();
  const { result, isRefreshing, scrollRef, sentinelRef } = usePagination({
    trigger: ({ page }) => _trigger({ page, size: 15 }),
    result: _result,
  });
  const { isProfileCompleted } = useAuthDetails();
  // const [joinChallengeTrigger] = useLazyJoinChallengeQuery();
  const { data: challengeResult } = useGetChallengeByIdQuery(3);
  const handleAlert = useAlert();
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id) : 0;
  const { data: postData } = useGetPostByIdQuery(postId, {
    skip: !postId || typeof postId != "number",
  });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openPostModal, setPostModalOpen] = useState(!!id);
  const [openChallengePromptModal, setChallengePromptModalOpen] = useState(
    false
  );
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (postId && postData?.status == 404) {
      handleAlert({ message: "Post not found", variant: "error" });
      navigate(PATHS.FEED);
    }
  }, [postId, postData]);

  // const handleChallengeJoin = () => {
  //   joinChallengeTrigger(3).then((result) => {
  //     if (result.error) {
  //       handleAlert({
  //         message: "Error joining challenge",
  //         variant: "error",
  //       });
  //       return;
  //     }

  //     setChallengePromptModalOpen(true);
  //   });
  // };

  const handleCloseModal = () => {
    setPostModalOpen(false);
    navigate(PATHS.FEED);
  };

  return (
    <>
      <Head
        title="Feed | Golvia"
        description=""
        ogTitle={`Post by ${postData?.data?.user.firstName} ${postData?.data?.user.firstName}`}
        ogDescription={`View this ${
          postData?.data?.challengeId && "challenge"
        } post by ${postData?.data?.user.firstName} ${
          postData?.data?.user.firstName
        } ${
          postData?.data?.challengeId &&
          "for #CelebrateYourCountryChallenge on Golvia"
        }`}
        ogImage={`${postData?.data?.mediaUrls[0].link}`}
        ogType="article"
        ogUrl={postId ? `window.location.href${postId}` : window.location.href}
      />

      <AccessLayout path={PATHS.FEED}>
        <FeedLayout ref={scrollRef}>
          {isRefreshing && (
            <div
              className={`absolute top-[calc(${HeaderHeight.mobile} + 20px)] -left-full -right-full`}
            >
              <FetchLoader />
            </div>
          )}

          <Box mt={isRefreshing ? 3 : "initial"}>
            {isMobile && (
              <div className="flex items-center gap-x-2 my-2">
                <Divider sx={{ flex: 1 }} />
                <Link to={PATHS.LIVESCORE}>
                  <p className="text-primary text-[14px] pr-1 font-[500]">
                    Browse Livescores
                  </p>
                </Link>
              </div>
            )}

            {/* {challengeResult?.data && (
              <Stack
                direction="row"
                pl={1.5}
                pr={2}
                mb={1}
                className="bg-gv-blue_1D69D8 rounded-2xl card-border relative text-white"
                style={{ border: "0.5px solid #dfdeda " }}
                spacing={2}
              >
                <img
                  src={joinChallenge}
                  className="left-0 sm:left-8 self-start absolute sm:static opacity-25 sm:opacity-100 sm:block"
                  width={100}
                />
                <Stack
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={2}
                  zIndex={10}
                  width="100%"
                  className="flex-col sm:!flex-row pt-3 pb-3 sm:pt-6 sm:pb-8"
                >
                  <Stack className="flex-1">
                    <Typography variant="h$24" fontWeight={500} fontSize="29px" lineHeight="32px">
                      {challengeResult?.data.title}
                    </Typography>
                    <Typography fontWeight={500}>{challengeResult?.data.description}</Typography>
                  </Stack>
                  {!challengeResult?.data ||
                    (!challengeResult?.data.hasJoined ? (
                      <Button
                        variant="contained"
                        className="!bg-[#0E3D91] flex rounded-xl"
                        onClick={handleChallengeJoin}
                      >
                        <Typography variant="p$16" px={1} fontWeight={500} color="white">
                          Join <span className="md:hidden">Challenge</span>
                        </Typography>
                      </Button>
                    ) : (
                      <IconButton
                        className="!mt-0"
                        onClick={() => navigate(PATHS.CHALLENGE.LEADERBOARD)}
                      >
                        <LeaderboardIcon
                          width={45}
                          height={45}
                          className="text-gv-blueMinus2_DDEBFD"
                        />
                      </IconButton>
                    ))}
                </Stack>
              </Stack>
            )} */}

            <div
              className="bg-white rounded-2xl card-border"
              style={{ border: "0.5px solid #dfdeda " }}
            >
              <FeedPost challenge={challengeResult?.data} />
            </div>

            {/* Profile Level Banner */}
            {!isProfileCompleted && (
              <Stack
                justifyContent="space-between"
                width="100%"
                padding={2}
                className="mt-2 bg-tertiary rounded-2xl"
              >
                <div>
                  <h3 className="text-[14px]">
                    Profile Level{" "}
                    <span className="text-primary font-medium">40% of 100</span>
                  </h3>
                  <h4 className="text-[16px] font-normal">
                    Complete your profile to start using Golvia app
                  </h4>
                </div>
                <div>
                  <button
                    className="rounded-lg border bg-primary text-white px-4  mt-2 py-2 text-sm font-medium"
                    onClick={handleOpen}
                  >
                    Get Started
                  </button>
                </div>
              </Stack>
            )}

            {/* Feed Content */}
            <div>
              <InfiniteScroll result={result} ref={sentinelRef}>
                {result.currentData?.data.map((post) => (
                  <FeedItem key={post.id} post={post} />
                ))}
              </InfiniteScroll>

              {!result.currentData && (
                <Stack spacing={2} className="mt-2">
                  <Stack direction="row" spacing={2}>
                    <Skeleton variant="circular" width={50} height={50} />
                    <Stack>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                        width={200}
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1rem" }}
                        width={150}
                      />
                    </Stack>
                  </Stack>

                  <Skeleton variant="rounded" width="100%" height={400} />
                  <Stack width="100%" direction="row" spacing={2}>
                    <Skeleton variant="circular" width={30} height={30} />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={30}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: "1rem" }}
                      width={100}
                      height={30}
                    />
                  </Stack>
                </Stack>
              )}
            </div>
          </Box>
        </FeedLayout>
      </AccessLayout>

      {postData?.data && (
        <PostModal
          post={postData.data}
          openModal={openPostModal}
          handleCloseModal={handleCloseModal}
        />
      )}
      <ChallengePostPromptModal
        isOpen={openChallengePromptModal}
        onClose={() => setChallengePromptModalOpen(false)}
      />
      <CompleteProfileModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Feed;
