import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import { getOtherUserProfile } from "api/profile";
import BackdropLoader from "components/loaders/Backdrop";
// import Icons from "constants/Icons";
import successTone from "../../../assets/tone/success-tone.mp3";
import images from "constants/images";
import AccessLayout from "layouts/AccessLayout";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { PATHS } from "routes/path";
import { BsPeopleFill } from "react-icons/bs";
import { useCreateConnect } from "pages/network/hooks/useCreateConnect";
import { MdAccessTime } from "react-icons/md";
import { useToggleFollowUser } from "pages/network/hooks/useFollow";
import ProfileDisplay from "./Utils/ProfileDisplay";
import { OtherUsersPayload } from "models/profile";
import { useLazyGetPostsByUserQuery } from "pages/feeds/api";
import FeedItem from "pages/feeds/Post";
import useAlert from "components/alert/useAlert";
import CryptoJS from "crypto-js";
import FormatProfileType from "./Utils/FormatProfileType";
import { CgFeed } from "react-icons/cg";

const SECRET_KEY = "S9fj@8vGZz2E&xLpWkq!Nr7uTbX%JwYm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { md: 3, xs: 1 } }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OtherUserProfile = () => {
  const { id } = useParams<{ id: string; name: string }>();
  const [data, setData] = useState<OtherUsersPayload>();
  const [loading, setLoading] = useState<boolean>(false);
  const [triggerPosts, { data: posts }] = useLazyGetPostsByUserQuery();

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const pathEmail = useMemo(() => {
    if (!id) {
      return null;
    }
    const restoreHashedEmail = id.replace(/_/g, "/").replace(/-/g, "+");
    const bytes = CryptoJS.AES.decrypt(restoreHashedEmail, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }, [id]);

  const handleOtherProfile = async () => {
    const decodedEmail = pathEmail ?? "Invalid email";
    setLoading(true);
    await getOtherUserProfile(decodedEmail)
      .then((res) => {
        setLoading(false);
        const response = res?.data;
        setData(response);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    handleOtherProfile();
    triggerPosts({ email: pathEmail || "" });
  }, [id]);

  // interface ProfileMetadata {
  //   isFollowing: boolean;
  //   isConnected: boolean;
  //   followersCount: number;
  //   connectionsCount: number;
  // }

  // interface Profile {
  //   metadata?: ProfileMetadata;
  // }

  const profile = data?.data;

  const metadata = profile?.metadata || {
    isFollowing: false,
    isConnected: false,
    followersCount: 0,
    connectionsCount: 0,
  };

  const { firstName, lastName, sportType, profileType, country, email } =
    profile?.user || {};
  const {
    currentClub,
    preferredPosition,
    dateOfBirth,
    height,
    weight,
    biography,

    preferredClub,
    preferredFoot,

    // SCOUTS
    yearsOfExperience,
    scoutingExperienceYears,
    notableTalents,
    areasOfSpecialization,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,

    position,
    // ageGroup,
    scoutingHistory,

    socialMediaLinks,

    // FANBASE
    favoriteSports,
    favoriteAthletes,
    // notificationPreferences,
    // interactions,
    // purchasedItems,
    competitionLevel,

    // CLUB
    clubName,
    // contactEmail,
    // contactPersonName,
    // contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    // teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
  } = profile?.profile || {};

  const personalInformation = {
    country,
    height,
    weight,
    scoutingExperienceYears,
    notableTalents,
    areasOfSpecialization,
    favoriteSports,
    favoriteAthletes,
    // notificationPreferences,
    clubName,
    // contactEmail,
    // contactPersonName,
    // contactPhone,
  };

  const professionalInfo = {
    currentClub,
    preferredPosition,
    yearsOfExperience,
    preferredFoot,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,
    // interactions,
    // purchasedItems,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    // teamLogoUrl,
    players,
  };

  const otherInformations = {
    preferredClub,
    position,
    // ageGroup,
    scoutingHistory,
    socialMediaLinks,
    competitionLevel,
    clubAchievements,
    clubVacancies,
  };

  const playSuccessTone = () => {
    const audio = new Audio(successTone); // Replace with the path to your audio file
    audio.play();
  };

  const {
    createConnectionHandler,
    loadingButtonId: connectionLoader,
  } = useCreateConnect();

  const [updatedstatus, setUpdatedStatus] = useState<boolean>(false);

  const handleConnect = async (email: string, id: string) => {
    await createConnectionHandler(email, id);

    setUpdatedStatus(true);
    playSuccessTone();
  };

  const { createToggleFollowHandler } = useToggleFollowUser();

  const handleToggleFollow = async (email: string, id: string) => {
    await createToggleFollowHandler(email, id);

    setUpdatedStatus(true);
    playSuccessTone();
  };

  const handleAlert = useAlert();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleShare = async () => {
    if (isMobile) {
      try {
        await navigator.share({
          title: `${firstName} ${lastName} Golvia profile`,
          text: `Discover ${firstName}'s professional profile on Golvia. Explore my achievements, skills, and projects, and connect to collaborate or learn more about my expertise. Visit my profile today and get inspired!`,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing content", error);
      }
    } else {
      handleCopy();
    }
  };
  const [, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        handleAlert({
          message: "Link copied to clipboard",
          variant: "success",
        });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <>
      {loading && <BackdropLoader />}

      <AccessLayout path={PATHS.NETWORK}>
        <Box
          sx={{
            width: { lg: "70%", md: "75%", sm: "85%", xs: "100%" },
            margin: "0 auto",
            mt: 3,
          }}
        >
          <Box
            className="h-[142px] bg-primary rounded-tl-[12px] rounded-tr-[12px] p-3 flex justify-end"
            sx={{
              backgroundImage: `url(${profile?.asset?.coverPhotoUrl})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            {/* coverPhotoUrl */}
          </Box>
          <Box
            sx={{
              px: 3,
              boxSizing: "border-box",
              display: "flex",
              alignItems: { xs: "left", md: "center" },
              justifyContent: "space-between",
              rowGap: 2,
              bgcolor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
              pb: 4,
              flexDirection: { xs: "column", sm: "column", md: "row" },
            }}
          >
            <div className="flex flex-col ">
              <Avatar
                src={profile?.asset?.profilePictureUrl || images.defaultAvater}
                sx={{
                  width: "103px",
                  height: "103px",
                  mt: -8,
                  border: "3px solid #fff",
                }}
              />
              <div className="mt-3">
                <p className="font-[600] text-[25px]">
                  {firstName} {lastName}
                </p>
                <p className="text-gray-400 text-[14px]">
                  <FormatProfileType value={profileType ?? ""} /> - {sportType}
                </p>
              </div>
              <div className="mt-3 rounded-[4px] flex items-center justify-center w-fit  gap-2 ">
                {country && (
                  <p className="text-[14px]">
                    {country}
                    <span style={{ marginLeft: "9px" }}>|</span>{" "}
                  </p>
                )}
                <p className="text-[14px]">
                  {metadata?.connectionsCount || 0} Connections{" "}
                </p>{" "}
                .{" "}
                <p className="text-[14px]">
                  {metadata?.followersCount || 0} Followers
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              {profileType === "TEAM" ? (
                <Button
                  variant="outlined"
                  onClick={() => handleToggleFollow(email || "", "1")}
                  disabled={connectionLoader === "1"}
                  sx={{
                    width: "110px",
                    fontSize: "12px",
                    height: "37px",
                    display: metadata?.isFollowing ? "none" : "flex",
                  }}
                >
                  {updatedstatus ? "Unfollow" : "Follow"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => handleConnect(email || "", "1")}
                  disabled={connectionLoader === "1" || updatedstatus}
                  startIcon={
                    updatedstatus ? (
                      <MdAccessTime style={{ fontSize: "14px" }} />
                    ) : (
                      <BsPeopleFill style={{ fontSize: "14px" }} />
                    )
                  }
                  className="border border-primary text-primary text-xs py-1 px-4 rounded-2xl"
                  sx={{
                    width: "110px",
                    bgcolor: "primary.main",
                    color: "#fff",
                    px: 2,
                    fontSize: "12px",
                    height: "37px",
                    boxShadow: "none",
                    display: metadata?.isConnected ? "none" : "flex",
                  }}
                >
                  {connectionLoader === "1" ? (
                    <LinearProgress sx={{ width: "40px", height: "2px" }} />
                  ) : updatedstatus ? (
                    "Pending"
                  ) : (
                    "Connect"
                  )}
                </Button>
              )}
              <Box>
                <Button sx={{ mt: 2 }} onClick={handleShare}>
                  Share Profile
                </Button>
              </Box>
            </div>
          </Box>

          <Box
            sx={{
              bgcolor: "#fff",
              borderRadius: "12px",
              px: 3,
              boxSizing: "border-box",

              boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",

              mt: 3,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 4 }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Profile information"
                  {...a11yProps(0)}
                  sx={{ fontSize: "14px" }}
                />
                <Tab
                  label={`All Post (${posts?.data?.length || 0})`}
                  {...a11yProps(1)}
                  sx={{ fontSize: "14px" }}
                />
              </Tabs>
            </Box>

            {/* PERSONAL INFO */}
            <CustomTabPanel value={value} index={0}>
              <div className="pt-5 flex-1 pb-6  ">
                {/* Personnal Info */}
                <p className="text-black font-[500]">Personal information</p>
                <hr className="my-3" />
                {dateOfBirth && (
                  <div className="flex  space-x-3 mt-2">
                    <p className="text-[14px] whitespace-nowrap">Age:</p>
                    <p className="text-black font-[500] text-[14px]">
                      {getAge(dateOfBirth)}
                    </p>
                  </div>
                )}
                <ProfileDisplay profileDetails={personalInformation} />

                {/* Professional Information */}
                <div className="mt-8">
                  <p className="text-black font-[500]">
                    Professional information
                  </p>
                  <hr className="my-3" />

                  <ProfileDisplay profileDetails={professionalInfo} />
                </div>

                {/* Dream Goal / Ambition */}
                <div className="mt-8">
                  <p className="text-black font-[500]">Other Informations</p>
                  <hr className="my-3" />
                  <ProfileDisplay profileDetails={otherInformations} />

                  {biography && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-md">
                      <p>Bio</p>
                      <p className="text-[14px] text-black">{biography}</p>
                    </div>
                  )}
                </div>
              </div>
            </CustomTabPanel>

            {/* FEEEEEEEEEDDDDDDDSSSSSS */}
            <CustomTabPanel value={value} index={1}>
              <div className="md:w-[100%]  pb-4  overflow-x-hidden">
                <Typography
                  variant="h$20"
                  fontWeight="medium"
                  color="black"
                  pb={2}
                >
                  All Posts
                </Typography>
                {posts?.data?.length === 0 ? (
                  <Box
                    sx={{
                      height: "200px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CgFeed style={{ fontSize: "50px" }} />
                    <Typography sx={{ fontWeight: 500, textAlign: "center" }}>
                      {firstName} hasn’t posted yet
                    </Typography>
                    <Typography sx={{ fontSize: "12px", textAlign: "center" }}>
                      Recent posts shared by{firstName} will be displayed here.
                    </Typography>
                  </Box>
                ) : (
                  posts?.data &&
                  posts?.data.map((post) => (
                    <FeedItem key={post.id} post={post} compact />
                  ))
                )}
              </div>
            </CustomTabPanel>
          </Box>
        </Box>
      </AccessLayout>
    </>
  );
};

export default OtherUserProfile;

const getAge = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};
