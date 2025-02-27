import { Avatar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { DummyAgentData, DummyClubData } from "helpers/dummydata";
// import { HiCheckBadge } from "react-icons/hi2";
import Avartar1 from "assets/dummy_avatar_img/avatar_img.svg";
import Avartar2 from "assets/dummy_avatar_img/avatar_img2.svg";
import Avartar4 from "assets/dummy_avatar_img/avatar_mg4.svg";
import { TbPlayerPlayFilled } from "react-icons/tb";
import useAuthDetails from "pages/auth/useAuthDetails";
// import { getTopAgents, getTopAtheletes, getTopClubs } from "api";
// import { useGetApi } from "api/hooks/useGetApi";
// import { UserListSkeleton } from "./GlobalNetwork";
// import images from "constants/images";
// import { MdChevronRight } from "react-icons/md";
import { useState, useEffect } from "react";

// import { RxDividerVertical } from "react-icons/rx"
import {
  useGetChallengeByIdQuery,
  // useGetLeaderboardQuery,
  // useLazyJoinChallengeQuery,
} from "api/challenge";
// import useAlert from "components/alert/useAlert";
// import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
// import { PATHS } from "Routes/routes.path";
// import { ReactComponent as ShareIcon } from "assets/icons/share-chain.svg";
// import ZenithImg from "assets/imgs/zenith.png";
// import { Link, useNavigate } from "react-router-dom";
import ChallengePostPromptModal from "pages/feeds/ChallangePostPromptModal";
import ShareModal from "pages/feeds/Post/ShareModal";

export default function GlobalNetworkWidget() {
  const [expanded, setExpanded] = useState(false);
  // const [joinChallengeTrigger] = useLazyJoinChallengeQuery();
  const [country] = useState<string>("England");
  const [league] = useState<string>("Premier League");
  // const [joinChallengeTrigger] = useLazyJoinChallengeQuery();
  const { data: challengeResult } = useGetChallengeByIdQuery(3);
  // const { data: leaderboardResult } = useGetLeaderboardQuery(
  //   {
  //     id: 3,
  //     params: { page: 1, size: 10 },
  //   },
  //   { pollingInterval: 300000 }
  // );
  const [openChallengePromptModal, setChallengePromptModalOpen] = useState(
    false
  );
  const [openShareModal, setOpenShareModal] = useState(false);
  const { asset } = useAuthDetails();

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

  return (
    <>
      <div
        className="bg-white rounded-2xl  max-h-[400px] overflow-hidden "
        style={{ border: "0.5px solid #dfdeda " }}
      >
        {/* <div className="pt-5 flex items-center justify-between ">
          <p className="font-[500] text-[16px]">LiveScore</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#F3F6FC",
              columnGap: 2,
              px: 2,
              py: 0.4,
            }}
          >
            <img
              src={
                "https://cdn.britannica.com/44/344-050-94536674/Flag-England.jpg"
              }
              alt="country_flag"
              width={20}
            />
            <Typography sx={{ fontSize: "12px" }}>EngLand</Typography>
          </Box>
        </div> */}
        {/* <LiveScoreWidget/> */}

        <div
          id="awo_w7174_674aacfd8bc37"
          className="livescore-widget hide_scrollbar"
          style={{ margin: 0, padding: 0, overflow: "scroll" }}
        >
          <iframe
            data-widget="awo_w7174_674aacfd8bc37"
            data-hj-allow-iframe="true"
            src="https://ls.soccersapi.com?w=awo_w7174_674aacfd8bc37"
            width="100%"
            height="1700"
            frameBorder="0"
            className="widget hide_scrollbar"
            style={{
              overflow: "scroll",
              height: "1000px",
              width: "100%",
              scrollbarWidth: "none",
            }}
            title="Live Score Widget"
          ></iframe>
        </div>

        {/*  */}
        {/* <div
          className={`bg-gray-100 mt-5 ${
            expanded ? "h-[300px]" : "h-[40px]"
          } transition-all `}
        >
          <div
            className=" p-3 flex justify-center items-center cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <p className="text-center text-[12px] font-[600]">
              Premiere League
            </p>
            <MdChevronRight />
          </div>
        </div> */}

        {/* <div className="p-2 flex justify-between items-center">
          <div className="flex items-center gap-x-2"> 
<p className="text-[10px] font-[500]">Manchester United</p>
<p className="text-[10px] font-[500]">0</p>

          </div>
          <RxDividerVertical />
        <div className="flex items-center gap-x-2"> 
<p className="text-[10px] font-[500]"> 1</p>
<p className="text-[10px] font-[500]"> Manchester United</p>

          </div>
        </div>
        <div className="p-2 flex justify-between items-center">
          <div className="flex items-center gap-x-2"> 
<p className="text-[10px] font-[500]">Manchester United</p>
<p className="text-[10px] font-[500]">0</p>

          </div>
          <RxDividerVertical />
        <div className="flex items-center gap-x-2"> 
<p className="text-[10px] font-[500]"> 1</p>
<p className="text-[10px] font-[500]"> Manchester United</p>

          </div>
        </div> */}
      </div>

      {/* {!!leaderboardResult?.pagination.totalItems && (
        <Box
          py={3}
          px={2}
          bgcolor="#112E61"
          borderRadius="16px"
          mt={1}
          className="*:text-white bg-gradient-to-b from-[#0B47AF] to-[#112E61]"
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            justifySelf="center"
          >
            <Typography
              variant="h$20"
              color="white"
              fontFamily="peralta"
              fontWeight={600}
              fontSize="21px"
              lineHeight="16px"
              maxWidth={115}
            >
              Celebrate{" "}
              <Typography
                variant="p$18"
                fontFamily="outfit"
                fontWeight={600}
                lineHeight="18px"
                component="span"
                color="#6FA5FF"
                py={0.5}
              >
                your Country
              </Typography>
            </Typography>
            <Typography
              variant="p$18"
              component="span"
              px={1}
              // py="2px"
              fontWeight={600}
              borderRadius={8}
              className="bg-gv-yellow_DA9500 h-full"
            >
              Challenge
            </Typography>
          </Stack>

          <Box pt={1} alignItems="center">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" spacing={2} py={2}>
                <Typography variant="h$20" fontWeight={500}>
                  Leaderboard
                </Typography>

                <Typography
                  variant="p$14"
                  px={1}
                  borderRadius="12px"
                  alignContent="center"
                  component="span"
                  className="bg-gv-blueMinus1_3373E0"
                >
                  {leaderboardResult?.pagination.totalItems || 0}
                </Typography>
              </Stack>
              <ShareIcon
                className="text-white"
                onClick={() => setOpenShareModal(true)}
              />
            </Stack>
            <Stack component="ul" spacing={1.5}>
              {leaderboardResult?.data?.slice(0, 10).map((item) => {
                return (
                  <Stack
                    key={item.user.email}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    component="li"
                    py={1.5}
                    px={1.5}
                    height="contain"
                    borderRadius="12px"
                    className="bg-[#10316A]"
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
                        sx={{ width: "28px", height: "28px" }}
                        src={item.user.profileImageUrl || ""}
                      />
                      <Typography variant="p$14">
                        {item.user.firstName} {item.user.lastName}
                      </Typography>
                    </Stack>
                    <Typography variant="p$14" fontWeight={500} color="#6FA5FF">
                      {item.likes || "--"}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
            {(leaderboardResult?.pagination.totalItems || 0) > 10 && (
              <Typography
                variant="p$14"
                px={1}
                py={0.5}
                mt={2}
                fontWeight={500}
                textAlign="center"
              >
                Join over {leaderboardResult?.pagination.totalItems} people
                participating
              </Typography>
            )}
            {!challengeResult?.data.hasJoined ? (
              <Button
                variant="contained"
                className="!bg-[#0E3D91] !flex rounded-xl !mt-4 !ml-auto !mr-auto"
                onClick={handleChallengeJoin}
              >
                <Typography
                  variant="p$14"
                  px={1}
                  py={1}
                  fontWeight={600}
                  color="white"
                >
                  JOIN CHALLENGE
                </Typography>
              </Button>
            ) : (
              <Link to={PATHS.CHALLENGE.LEADERBOARD}>
                <Typography
                  variant="p$14"
                  px={1}
                  py={1}
                  fontWeight={600}
                  color="white"
                  className="underline"
                  textAlign="center"
                >
                  View all
                </Typography>
              </Link>
            )}

            <Typography variant="p$14" lineHeight="18px" mt={2} mb={1.5}>
              Sponsor
            </Typography>
            <img src={ZenithImg} alt="zenith-sponsor" />
          </Box>
        </Box>
      )} */}

      <div
        className="bg-white rounded-2xl mt-2 py-4 px-4 pb-6"
        style={{ border: "0.5px solid #dfdeda " }}
      >
        <div>
          <h2 className="text-sm font-medium">
            Try Glovia{" "}
            <span className="bg-[#FFF0D0] text-secondary ml-1 py-1 px-2 rounded-2xl">
              Premium
            </span>
          </h2>
          <h3 className="mt-2 text-2xl font-medium">
            Reach unlimited audience
          </h3>
          <h4 className="mt-1 text-octenary font-normal text-sm">
            Through video uploads
          </h4>
        </div>
        <div className="mt-2 flex items-center">
          <div className="relative w-2/3">
            <div className="bg-white rounded-full p-[0.3px] inline-flex">
              <Avatar
                src={
                  asset?.profilePictureUrl ? asset?.profilePictureUrl : Avartar1
                }
                alt={"a user"}
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <div className="rounded-full  inline-flex absolute top-0 right-[60px] z-50">
              <Avatar
                src={Avartar4}
                alt={"a user"}
                sx={{ width: 30, height: 30 }}
              />
            </div>
            <div className="bg-white rounded-full p-1 inline-flex absolute top-9 left-24 z-50">
              <div className="bg-gray-200 w-8 h-8 rounded-full inline-flex items-center justify-center">
                <TbPlayerPlayFilled className="text-[#FF6C6C]" />
              </div>
            </div>
            <div className="rounded-full inline-flex absolute top-11 right-6 z-50">
              <Avatar
                src={Avartar2}
                alt={"a user"}
                sx={{ width: 20, height: 20 }}
              />
            </div>
          </div>
          <button className="bg-secondary text-white rounded-2xl py-2 px-3 text-sm font-medium">
            Get Started
          </button>
        </div>
      </div>

      <ChallengePostPromptModal
        isOpen={openChallengePromptModal}
        onClose={() => setChallengePromptModalOpen(false)}
      />
      <ShareModal
        isOpen={openShareModal}
        onClose={() => setOpenShareModal(false)}
        challenge={challengeResult?.data}
      />
    </>
  );
}
