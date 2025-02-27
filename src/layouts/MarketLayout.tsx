import { useEffect, useState } from "react";
import { Avatar, Box } from "@mui/material";
import CircularLoader from "../components/loaders/CircularLoader";
import HeroImg from "../assets/imgs/hero_img.png";
import Avartar1 from "../assets/dummy_avatar_img/avatar_img.svg";
import CompleteProfileModal from "../components/modals/CompleteProfileModal";
import useAuthDetails from "pages/auth/useAuthDetails";
import { HeaderHeight } from "constants/layers";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/path";
import { convertToTitleCase } from "pages/network/GlobalNetwork";
import AccessLayout from "./AccessLayout";
import { ActivityStat } from "./FeedLayout";

interface MarketLayoutProps {
  children: React.ReactNode;
}

const MarketLayout: React.FC<MarketLayoutProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const mobileMaxHeight = `calc(100vh - ${HeaderHeight.mobile})`;
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
      <AccessLayout path={PATHS.MARKETPLACE}>
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
                <Avatar
                  src={profilePicture ? profilePicture : Avartar1}
                  alt="avatar"
                  sx={{ width: 56, height: 56 }}
                />
                <div className="space-y-1 my-4 ">
                  <h2 className="font-medium text-xl">{`${firstName} ${lastName}`}</h2>
                  <h4 className="text-sm">
                    {profileType === "FANBASE"
                      ? "Fan"
                      : profileType === "ATHLETES"
                      ? "Athelete"
                      : convertToTitleCase(profileType || "")}{" "}
                    - <span className="text-gray-500">{sportType}</span>
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
              <div className="px-6 pt-6 bg-primary rounded-2xl ">
                <div className="relative h-[300px]">
                  <h5 className="uppercase text-[#FFC67F] text-[9px] mb-3">
                    Wolves vs Newcastle
                  </h5>
                  <h5 className="text-white text-3xl">
                    Charity Match Footballers Needed
                  </h5>
                  <Link to={PATHS.SETTINGS.PROFILE}>
                    <p className="text-xs text-blue-500 underline">
                      My Profile
                    </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-2 p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px]">
              <h3 className="text-base mb-6">My Activity Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[#7D7D7D]">Profile Views</h4>
                  <h5 className="text-primary">--</h5>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[#7D7D7D]">Post Impression</h4>
                  <h5 className="text-primary">--</h5>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="text-[#7D7D7D]">Impressions</h4>
                  <h5 className="text-primary">--</h5>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h3 className="text-septenary my-2 text-sm font-medium">
                Sponsored Posts
              </h3>
              <div className="px-6 pt-6 bg-primary rounded-2xl ">
                <div className="relative h-[300px]">
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
                </div>
              </div>
            </div>
          </Box>

          {/* Middle Side */}
          <Box
            maxHeight={{ xs: mobileMaxHeight, mb: desktopMaxHeight }}
            className="overflow-y-auto overflow-x-hidden max-h-screen w-full scrollbar-none"
          >
            {children}
          </Box>

          {/* Right Side */}
        </div>
      </AccessLayout>

      <CompleteProfileModal handleClose={handleClose} open={open} />
    </>
  );
};

export default MarketLayout;
