import React from "react";
import AccessLayout from "../layouts/AccessLayout";
import { PATHS } from "../Routes/routes.path";
import { Helmet } from "react-helmet-async";
import { Box, Avatar, CircularProgress, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { HeaderHeight } from "constants/layers";
import useAuthDetails from "./auth/useAuthDetails";
import images from "constants/images";
import { convertToTitleCase } from "./network/GlobalNetwork";
import CompleteProfileModal from "components/modals/CompleteProfileModal";

const Messages = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const mobileMaxHeight = `calc(100vh - ${HeaderHeight.mobile}*2)`;
  const desktopMaxHeight = `calc(100vh - ${HeaderHeight.desktop})`;

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
      <AccessLayout path={PATHS.MESSAGES}>
        <Helmet>
          <title>Messages | Golvia</title>
        </Helmet>
        <div className="flex justify-around *:pt-7 *:pb-12 space-x-0 md:space-x-8 bg-[#f4f2ee]">
          <Box
            maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
            className=" w-[25%] overflow-y-auto hidden md:block scrollbar-none"
          >
            <div className="bg-white rounded-2xl" style={{ border: "0.5px solid #dfdeda " }}>
              <div className="px-8 pt-8">
                <Link to={PATHS.SETTINGS.PROFILE}>
                  <Avatar
                    src={profilePicture ? profilePicture : images.defaultAvater}
                    alt="avatar"
                    sx={{ width: 56, height: 56 }}
                  />
                </Link>
                <div className="space-y-1 my-4 ">
                  <Link to={PATHS.SETTINGS.PROFILE}>
                    <h2 className="font-medium text-xl">{`${firstName} ${lastName}`}</h2>
                  </Link>
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
                    <CircularProgress value={40} />
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
                      <p className="text-xs text-blue-500 underline">My Profile</p>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </Box>
          <Box
            maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
            className="overflow-y-auto overflow-x-hidden max-h-screen md:w-[70%] w-[100%] scrollbar-none"
          >
            <Box
              paddingY={4}
              borderRadius="16px"
              className="*:xs:!px-4 *:md:!px-8 bg-white flex flex-col items-center justify-center"
              style={{ border: "0.5px solid #dfdeda ", height: "80vh" }}
            >
              <img src={images.message} />
              <Typography sx={{ fontSize: "25px", mt: 2 }}>Golvia Messenger</Typography>
              <Typography sx={{ fontSize: "18px" }}>Coming Soon</Typography>
              <Link to={PATHS.FEED}>
                <Button
                  variant="outlined"
                  sx={{ mt: 2, borderRadius: "8px", py: 1, width: "200px" }}
                >
                  Back to home
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
      </AccessLayout>

      <CompleteProfileModal handleClose={handleClose} open={open} />
    </>
  );
};

export default Messages;
