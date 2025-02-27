import React, { forwardRef, useEffect } from "react";
import { Avatar, Box, CircularProgress } from "@mui/material";
import CircularLoader from "../components/loaders/CircularLoader";
import Avartar1 from "../assets/dummy_avatar_img/avatar_img.svg";
import CompleteProfileModal from "../components/modals/CompleteProfileModal";
import useAuthDetails from "pages/auth/useAuthDetails";
import { HeaderHeight } from "constants/layers";
import GlobalNetworkWidget from "pages/network/GlobalNetworkWidget";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/path";
import Ads from "components/Adverts/Ads";
import FormatProfileType from "pages/settings/profile/Utils/FormatProfileType";
import { useGetApi } from "api/hooks/useGetApi";
import { getActivityStat } from "api/profile";

interface FeedLayoutProps {
  children: React.ReactNode;
}

export default forwardRef<HTMLElement, FeedLayoutProps>(function FeedLayout(
  { children },
  ref
) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const mobileMaxHeight = `calc(100vh - ${HeaderHeight.mobile}*2)`;
  const desktopMaxHeight = `calc(100vh - ${HeaderHeight.desktop})`;

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const {
    firstName,
    lastName,
    isProfileCompleted,
    profilePicture,
    country,
    profileDetails,
    profileType,
    sportType,
  } = useAuthDetails();

  return (
    <>
      <div className="flex justify-around *:pt-7 *:pb-12 space-x-0 md:space-x-8 bg-[#f4f2ee]">
        {/* Left side */}
        <Box
          maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
          className=" w-2/4 overflow-y-auto hidden md:block scrollbar-none"
        >
          <div
            className="bg-white rounded-2xl"
            style={{ border: "0.5px solid #dfdeda " }}
          >
            <div className="px-8 pt-8">
              <Link to={PATHS.SETTINGS.PROFILE}>
                <Avatar
                  src={profilePicture ? profilePicture : Avartar1}
                  alt="avatar"
                  sx={{ width: 56, height: 56 }}
                />
              </Link>
              <div className="space-y-1 my-4 ">
                <Link to={PATHS.SETTINGS.PROFILE}>
                  <h2 className="font-medium text-xl">{`${firstName} ${lastName}`}</h2>
                </Link>
                <h4 className="text-sm">
                  <FormatProfileType value={profileType ?? ""} />-{" "}
                  <span className="text-gray-500">{sportType}</span>
                </h4>
              </div>
            </div>
            {!isProfileCompleted ? (
              <>
                <hr />
                <div className="px-8 pb-8 mt-4 flex items-start justify-between w-full">
                  <div className="space-y-2">
                    <h5 className="text-[#99A4BA]">Profile Level</h5>
                    <button
                      onClick={handleOpen}
                      className="rounded-xl border text-primary border-primary px-3 py-2"
                    >
                      Complete Profile
                    </button>
                  </div>
                  <CircularLoader value={40} />
                </div>
              </>
            ) : (
              <>
                <hr />
                <div className="px-8 pb-8 mt-4 ">
                  {country && (
                    <div className="flex items-center gap-x-2  texx-[12px]">
                      <p className="text-[#7D7D7D]">Location:</p>
                      <p>{country || ""}</p>
                    </div>
                  )}
                  {profileDetails?.currentClub && (
                    <div className="flex items-center gap-x-2 mt-2 text-[12px]">
                      <p className="text-[#7D7D7D]"> Current Club:</p>
                      <p>{profileDetails?.currentClub || ""}</p>
                    </div>
                  )}
                  {profileDetails?.preferredPosition && (
                    <div className="flex items-center gap-x-2 mt-2 text-[12px]">
                      <p className="text-[#7D7D7D]"> Position:</p>
                      <p>{profileDetails?.preferredPosition || ""}</p>
                    </div>
                  )}

                  <Link to={PATHS.SETTINGS.PROFILE}>
                    <p className="text-xs text-blue-500 underline">
                      My Profile
                    </p>
                  </Link>
                </div>
              </>
            )}
          </div>
          <ActivityStat />
          <div className="mt-2">
            <h3 className="text-septenary my-2 text-sm font-medium">
              Sponsored Posts
            </h3>
            <div className=" rounded-2xl ">
              {/* <div className="relative h-[300px]">
                <h5 className="uppercase text-[#FFC67F] text-[9px] mb-3">
                  Wolves vs Newcastle
                </h5>
                <h5 className="text-white text-3xl">
                  Charity Match Footballers Needed
                </h5>

                <button className="mt-2 rounded-xl border text-primary bg-white px-3 py-1 text-sm font-medium">
                  Join team
                </button>
                <img
                  src={HeroImg}
                  alt="sports man wearing yellow"
                  className="absolute bottom-0"
                  width={274}
                />
              </div> */}

              <Ads />
            </div>
          </div>
        </Box>

        {/* Middle Side */}
        <Box
          ref={ref}
          maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
          className="overflow-y-auto overflow-x-hidden max-h-screen w-full scrollbar-none"
        >
          {children}
        </Box>

        {/* Right Side */}
        <Box
          maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
          className="w-2/4 overflow-y-auto overflow-x-hidden hidden lg:block max-h-screen scrollbar-none"
        >
          <GlobalNetworkWidget />
        </Box>

        {/* {!isMobile && (
          <div className="w-2/4 h-full">
           
          </div>
        )} */}
      </div>

      <CompleteProfileModal handleClose={handleClose} open={open} />
    </>
  );
});

export const ActivityStat = () => {
  const { data, loading } = useGetApi(getActivityStat);

  const { impressions, postImpressions, profileViews } = data?.data || [];
  return (
    <>
      <div className="mt-2 p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base ">My Activity Stats</h3>
          {loading && <CircularProgress size={15} />}
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link to={PATHS.ACTIVITY_STAT.MY_PROFILE_VIEWS}>
              <h4 className="text-[#7D7D7D]">Profile Views</h4>
            </Link>
            <h5 className="text-primary">{profileViews || "--"}</h5>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-[#7D7D7D]">Post Impression</h4>
            <h5 className="text-primary">{postImpressions || "--"}</h5>
          </div>
          <div className="flex items-center justify-between">
            <h4 className="text-[#7D7D7D]">Impressions</h4>
            <h5 className="text-primary">{impressions || "--"}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
