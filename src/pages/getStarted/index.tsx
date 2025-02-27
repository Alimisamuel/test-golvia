import AccessLayout from "layouts/AccessLayout";
import { PATHS } from "Routes/path";
import { Helmet } from "react-helmet-async";
import {
  Avatar,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Avatar1 from "assets/dummy_avatar_img/avatar_img.svg";
import CircularLoader from "components/loaders/CircularLoader";
import { FaCircleCheck } from "react-icons/fa6";
import useSectionHook from "./useSectionHook";
import Athletes from "./Athelete";
import Scout from "./Scout";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileCompleted from "./ProfileCompleted";
import useAuthDetails from "pages/auth/useAuthDetails";
import { ProfileSectionKeysMap } from "pages/auth/RegistrationType";
import Club from "./Club";
import Fanbase from "./Fanbase";
import { convertToTitleCase } from "pages/network/GlobalNetwork";
import { ActivityStat } from "layouts/FeedLayout";

const GetStarted = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);

  const { firstName, lastName, profilePicture } = useAuthDetails();
  const profileType = (useAuthDetails().profileType ||
    "ATHLETES") as keyof ProfileSectionKeysMap;

  const { sections, currentSectionKey } = useSectionHook(profileType); // User data can be added to the hook to provide profile type

  const location = useLocation();

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sectionParams = searchParams.get("section");
    if (sectionParams === "completed") {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }

    if (location.pathname === "/edit-profile") {
      setIsProfileEdit(true);
    } else {
      setIsProfileEdit(false);
    }
  }, [location]);

  const pType = {
    ATHELETE: "ATHLETES",
    SCOUT: "SCOUT",
    CLUB: "TEAM",
    FANBASE: "FANBASE",
  };

  return (
    <AccessLayout path={PATHS.GET_STARTED}>
      <Helmet>
        <title>Get Started | Profile | Golvia</title>
      </Helmet>
      <Stack
        direction={{ xs: "column", md: "row" }}
        paddingY={4}
        spacing={{ xs: 3, lg: 4 }}
      >
        {!isMobile && (
          <div className=" w-1/4 h-full">
            <div
              className="bg-white rounded-2xl"
              style={{ border: "0.5px solid #dfdeda " }}
            >
              <div className="px-8 pt-8">
                <div className="flex justify-between items-center">
                  <Avatar
                    src={profilePicture || Avatar1}
                    alt="avatar"
                    sx={{ width: 56, height: 56 }}
                  />
                  {isProfileEdit && (
                    <Typography
                      sx={{
                        fontSize: "12px",
                        bgcolor: "primary.light",
                        px: 2,
                        border: "1px solid",
                        borderColor: "primary.main",
                        color: "primary.main",
                        borderRadius: "3px",
                        py: 0.2,
                      }}
                    >
                      Profile Edit
                    </Typography>
                  )}
                </div>

                <div className="space-y-1 my-4">
                  <h2 className="font-medium text-xl">
                    {firstName} {lastName}
                  </h2>
                  <h4 className="text-sm">
                    {profileType === "ATHLETES"
                      ? "Athlete"
                      : convertToTitleCase(profileType) || ""}
                  </h4>
                </div>
              </div>
              <hr />
              <div className="px-8 pb-8 mt-4 flex items-start justify-between w-full">
                <div className="space-y-2">
                  <h5 className="text-[#99A4BA]">Profile Level</h5>
                </div>
                <CircularLoader
                  value={isCompleted || isProfileEdit ? 100 : 40}
                />
              </div>
            </div>
            <ActivityStat />
          </div>
        )}

        <Stack
          width={{ xs: "100%", lg: "75%" }}
          borderRadius="16px"
          paddingY={{ xs: 0, md: 4 }}
          className="bg-white"
          sx={{ border: "0.5px solid #dfdeda " }}
        >
          {/* Nav */}
          {isCompleted ? (
            <ProfileCompleted />
          ) : (
            <>
              {!isMobile && (
                <>
                  <Stack
                    direction="row"
                    spacing={{ xs: 4, lg: 8 }}
                    paddingX={4}
                    paddingY={3}
                  >
                    {Object.entries(sections).map(
                      ([key, { label, completed }], index) => (
                        <Stack
                          key={key}
                          direction="row"
                          alignItems="center"
                          spacing={2}
                        >
                          {!completed ? (
                            <div
                              className={`rounded-full ${
                                currentSectionKey === key
                                  ? "text-white bg-primary"
                                  : "text-primary bg-[#EBF4FF] hover:bg-[#C5E1F5]"
                              }  h-8 w-8 flex items-center justify-center`}
                            >
                              {++index}
                            </div>
                          ) : (
                            <FaCircleCheck className="text-nonenary text-3xl" />
                          )}
                          <div className="text-xs">{label}</div>
                        </Stack>
                      )
                    )}
                  </Stack>
                  <hr />
                </>
              )}

              {pType.ATHELETE === profileType && (
                <AtheleteComponent isProfileEdit={isProfileEdit} />
              )}
              {pType.SCOUT === profileType && (
                <ScoutComponent isProfileEdit={isProfileEdit} />
              )}
              {pType.CLUB === profileType && (
                <TeamComponent isProfileEdit={isProfileEdit} />
              )}
              {pType.FANBASE === profileType && (
                <FanBaseComponent isProfileEdit={isProfileEdit} />
              )}
            </>
          )}
        </Stack>
      </Stack>
    </AccessLayout>
  );
};

export default GetStarted;

interface editPayload {
  isProfileEdit: boolean;
}

const AtheleteComponent = (props: editPayload) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = useSectionHook(
    "ATHLETES"
  );
  return (
    <Athletes
      currentSectionKey={currentSectionKey}
      onNext={onNext}
      onPrevious={onPrevious}
      onComplete={onComplete}
      isProfileEdit={props.isProfileEdit}
    />
  );
};
const ScoutComponent = (props: editPayload) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = useSectionHook(
    "SCOUT"
  );
  return (
    <Scout
      currentSectionKey={currentSectionKey}
      onNext={onNext}
      onPrevious={onPrevious}
      onComplete={onComplete}
      isProfileEdit={props.isProfileEdit}
    />
  );
};
const TeamComponent = (props: editPayload) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = useSectionHook(
    "TEAM"
  );
  return (
    <Club
      currentSectionKey={currentSectionKey}
      onNext={onNext}
      onPrevious={onPrevious}
      onComplete={onComplete}
      isProfileEdit={props.isProfileEdit}
    />
  );
};
const FanBaseComponent = (props: editPayload) => {
  const { currentSectionKey, onNext, onPrevious, onComplete } = useSectionHook(
    "FANBASE"
  );
  return (
    <Fanbase
      currentSectionKey={currentSectionKey}
      onNext={onNext}
      onPrevious={onPrevious}
      onComplete={onComplete}
      isProfileEdit={props.isProfileEdit}
    />
  );
};
