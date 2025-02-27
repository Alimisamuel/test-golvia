import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import usePagination from "common/hooks/pagination/usePagination";
import InfiniteScroll from "common/InfiniteScroll";
import AccessLayout from "layouts/AccessLayout";
import FeedLayout from "layouts/FeedLayout";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import {
  useGetChallengeByIdQuery,
  useLazyGetLeaderboardQuery,
} from "api/challenge";
import { ReactComponent as ShareIcon } from "assets/icons/share-chain.svg";
import ShareModal from "pages/feeds/Post/ShareModal";
import { useState } from "react";
import { PATHS } from "routes/path";
import toTitleCase from "common/util/toTitleCase";
import useAuthDetails from "pages/auth/useAuthDetails";
import { useNavigate } from "react-router-dom";

// const makeLeaderboardPath =
// (id: string): MakePagePaginationPath =>
// ({ page, size }) =>
//   challengeMediaPath({ page, size=10, id });

export default function Leaderboard() {
  const [_trigger, _result] = useLazyGetLeaderboardQuery();
  const { result, scrollRef, sentinelRef } = usePagination({
    trigger: ({ page }) => _trigger({ id: 3, params: { page, size: 10 } }),
    result: _result,
  });
  const { data: challengeResult } = useGetChallengeByIdQuery(3);
  const { sendUserToNextPage } = useNavigateWithHash();
  const [openShareModal, setOpenShareModal] = useState(false);

  const { email } = useAuthDetails();
  const navigate = useNavigate();

  return (
    <AccessLayout path={PATHS.CHALLENGE.LEADERBOARD}>
      <FeedLayout ref={scrollRef}>
        <>
          <Box
            p={{ xs: 1, sm: 2, md: 3 }}
            className="bg-white rounded-3xl text-gv-black_1A1C1F"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              justifySelf="center"
            >
              <Typography
                variant="h$24"
                fontSize="26px"
                fontWeight={500}
                textAlign="center"
              >
                {toTitleCase(challengeResult?.data.title || "")}{" "}
                <Typography
                  variant="p$18"
                  color="white"
                  component="span"
                  px={1}
                  py={0.5}
                  fontWeight={400}
                  borderRadius={8}
                  className="bg-gv-yellow_DA9500 h-full"
                >
                  Challenge
                </Typography>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h$24"
                fontSize="22px"
                lineHeight="18px"
                py={0.5}
                mt={3.5}
                mb={1}
              >
                Leaderboard
              </Typography>
              <Button
                variant="outlined"
                color="black"
                onClick={() => setOpenShareModal(true)}
                className="h-fit items-center"
              >
                <span>Share</span>
                <ShareIcon className="ml-1" />
              </Button>
            </Stack>

            <Typography
              variant="p$16"
              fontWeight={400}
              justifySelf="right"
              mb={1}
              component="a"
              target="_blank"
              href="https://golviadocsbucket.s3.us-east-1.amazonaws.com/Terms+%26+Conditions+-++Celebrate+Your+Country+Challenge.pdf"
              className="flex underline"
            >
              Terms & Conditions
            </Typography>

            <InfiniteScroll ref={sentinelRef} result={result}>
              <Stack component="ul" spacing={1.5}>
                {result.currentData?.data.map((item) => (
                  <Stack
                    key={item.user.email}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    component="li"
                    pl={1.5}
                    pr={2.5}
                    py={1.5}
                    height="contain"
                    borderRadius="12px"
                    className="bg-gv-blueMinus4_F3F6FC"
                    onClick={() => {
                      if (item.user?.email === email) {
                        navigate(PATHS.SETTINGS.PROFILE);
                      } else {
                        sendUserToNextPage(
                          item.user.email,
                          item.user.firstName
                        );
                      }
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{ width: "48px", height: "48px" }}
                        src={item.user.profileImageUrl || ""}
                      />
                      <Stack>
                        <Typography variant="p$18" fontWeight={500}>
                          {item.user.firstName} {item.user.lastName}
                        </Typography>
                        {!!item.user.connections && (
                          <Typography
                            variant="p$14"
                            fontSize="12px"
                            color="textSecondary"
                          >
                            {item.user.connections} connections
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                    <Typography variant="p$18" fontWeight={600}>
                      {item.likes || "--"}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </InfiniteScroll>

            {!result.currentData &&
              [...Array(10)].map((i, index) => (
                <Stack
                  key={index}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  className="mt-3"
                >
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

                  <Skeleton variant="rounded" width={50} height={20} />
                </Stack>
              ))}
          </Box>
          <ShareModal
            isOpen={openShareModal}
            onClose={() => setOpenShareModal(false)}
            challenge={challengeResult?.data}
          />
        </>
      </FeedLayout>
    </AccessLayout>
  );
}
