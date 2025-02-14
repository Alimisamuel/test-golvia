import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  IconButton,
  Divider,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import SettingsLayout from "layouts/SettingsLayout";
import { TbPhotoEdit } from "react-icons/tb";
import useAuthDetails from "pages/auth/useAuthDetails";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "Routes/routes.path";
import logo from "../../../assets/logo/logo-blue.svg";
import { PiPhoneLight } from "react-icons/pi";
import Icons from "constants/Icons";
import ProfileDisplay from "./Utils/ProfileDisplay";
import { useGetPostsByCurrentUserQuery } from "pages/feeds/api";
import FeedItem from "pages/feeds/Post";
import useAlert from "components/alert/useAlert";
import useNavigateWithHash from "./hooks/useNavigateWithHash";
import FormatProfileType from "./Utils/FormatProfileType";
import { CgFeed } from "react-icons/cg";
import EditCoverPhoto from "./Utils/EditCoverPhoto";
import { useGetApi } from "api/hooks/useGetApi";
import { getActivityStat, getProfileViewed } from "api";
import { HiOutlineEye } from "react-icons/hi2";
import icons from "../../../constants/Icons";

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 400, xs: 300 },

  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

const ProfileSettings = () => {
  const [open] = useState(true);
  const { data: posts } = useGetPostsByCurrentUserQuery({});

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { hashEmail } = useNavigateWithHash();

  const {
    firstName,
    lastName,
    profilePicture,
    sportType,
    profileType,
    isProfileCompleted,
    country,
    profileDetails,
    metadata,
    email,
    coverPhotoUrl,
  } = useAuthDetails();

  const { connectionsCount, followersCount } = metadata || {};

  const {
    // address,
    currentClub,
    preferredPosition,
    dateOfBirth,
    height,
    weight,
    biography,
    profession,
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
    // notesOnAthletes,
    position,
    ageGroup,
    scoutingHistory,
    phoneNumber,
    socialMediaLinks,
    city,

    // FANBASE
    favoriteSports,
    favoriteAthletes,
    notificationPreferences,
    interactions,
    purchasedItems,
    competitionLevel,

    // CLUB

    clubName,
    contactEmail,
    contactPersonName,
    contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
  } = profileDetails || {};

  const personalInformation = {
    preferredPosition,
    dateOfBirth,
    height,
    weight,
    yearsOfExperience,
    scoutingExperienceYears,
    notableTalents,
    areasOfSpecialization,
    favoriteSports,
    favoriteAthletes,
    notificationPreferences,
    clubName,
    contactEmail,
    contactPersonName,
    contactPhone,
  };

  const professionalInfo = {
    profession,
    preferredClub,
    preferredFoot,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,
    interactions,
    purchasedItems,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
  };

  const otherInformations = {
    position,
    ageGroup,
    scoutingHistory,
    socialMediaLinks,
    competitionLevel,
    clubAchievements,
    clubVacancies,
  };

  const handleAlert = useAlert();

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleShare = async () => {
    if (isMobile) {
      try {
        await navigator.share({
          title: `${firstName} ${lastName} Golvia profile`,
          text: `Discover ${firstName}'s professional profile on Golvia. Explore my achievements, skills, and projects, and connect to collaborate or learn more about my expertise. Visit my profile today and get inspired!`,
          url: `https://golviasports.com/via/${firstName}/${hashEmail(
            email || ""
          )}`,
        });
        // console.log("Content shared successfully");
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
      .writeText(
        `https://golviasports.com/via/${firstName}/${hashEmail(email || "")}`
      )
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

  const [openModal, setOpenModal] = useState<boolean>(false);

  const { data, loading } = useGetApi(getProfileViewed);

  const profileViewed = data?.data?.length || 0;

  return (
    <>
      <SettingsLayout>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Box sx={{ width: "100%" }}>
            <Box className="box-border bg-white rounded-[12px]">
              <Box
                className="h-[142px] bg-primary rounded-tl-[12px] rounded-tr-[12px] p-3 flex justify-end"
                sx={{
                  backgroundImage: `url(${coverPhotoUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div>
                  {isMobile ? (
                    <IconButton
                      sx={{ bgcolor: "#fff" }}
                      onClick={() => setOpenModal(true)}
                    >
                      <TbPhotoEdit />
                    </IconButton>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={() => setOpenModal(true)}
                      sx={{
                        borderColor: "white",
                        color: "primary.main",
                        fontSize: "14px",
                        width: "134px",
                        bgcolor: "#fff",
                      }}
                    >
                      Update picture
                    </Button>
                  )}
                </div>
              </Box>
              <Box
                className="flex justify-between flex-col md:flex-row"
                paddingX={{ xs: 2, md: 6 }}
              >
                <div className="flex flex-col ">
                  <Avatar
                    src={profilePicture}
                    sx={{
                      width: "103px",
                      height: "103px",
                      mt: -8,
                      border: "3px solid #fff",
                    }}
                  />
                  <div className="mt-3">
                    <div className="flex gap-6 items-center">
                      <p className="font-[500] text-[20px]">
                        {firstName} {lastName}
                      </p>
                      <Typography
                        sx={{
                          ml: 1,
                          textDecoration: "underline",
                          color: "primary.main",
                          cursor: "pointer",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate(PATHS.EDIT_PROFILE)}
                      >
                        Edit Profile
                      </Typography>
                    </div>
                  </div>
                  <p className="text-gray-400 text-[14px] mt-3">
                    <span style={{ color: "#000" }}>
                      <FormatProfileType value={profileType ?? ""} />
                    </span>{" "}
                    - {sportType}
                  </p>
                  <div className="mt-1 rounded-[4px] flex items-center justify-center w-fit  gap-2 ">
                    {country && (
                      <p className="text-[14px]">
                        {country}
                        <span style={{ marginLeft: "9px" }}>|</span>{" "}
                      </p>
                    )}
                    <Link to={`${PATHS.NETWORK}?tab=mynetwork`}>
                      <p className="text-[14px] hover:underline cursor-pointer hover:text-primary">
                        Profile Views ({profileViewed || 0})
                      </p>
                    </Link>
                    .{" "}
                    <Link to={`${PATHS.NETWORK}?tab=mynetwork`}>
                      <p className="text-[14px] hover:underline cursor-pointer hover:text-primary">
                        Connections ({connectionsCount || 0}){" "}
                      </p>
                    </Link>{" "}
                    .{" "}
                    <Link to={`${PATHS.NETWORK}?tab=mynetwork`}>
                      <p className="text-[14px] hover:underline cursor-pointer hover:text-primary">
                        Followers ({followersCount || 0})
                      </p>
                    </Link>
                    <br />
                  </div>
                </div>

                <div className="pt-5">
                  {country ||
                    (city && (
                      <div className="mt-5 rounded-[4px] bg-blue-50 flex items-center justify-center w-fit p-1 gap-2 px-4 ">
                        <img src={Icons.location} alt="location" />
                        <p className="text-[14px]">{country || city}</p>
                      </div>
                    ))}
                  {currentClub && (
                    <div className="mt-5 rounded-[4px] bg-blue-50 flex items-center justify-center w-fit p-1 gap-2 px-4 ">
                      <img src={Icons.shirt} alt="location" />
                      <p className="text-[14px]">{currentClub}</p>
                    </div>
                  )}
                  {phoneNumber && (
                    <div className="mt-5 rounded-[4px] bg-blue-50 flex items-center justify-center w-fit p-1 gap-2 px-4 ">
                      <PiPhoneLight />
                      <p className="text-[14px]">{phoneNumber}</p>
                    </div>
                  )}
                  <Box>
                    <Button
                      onClick={handleShare}
                      sx={{
                        mt: 2,
                        borderRadius: "6px",
                        height: "38px",
                        fontSize: "14px",
                      }}
                      variant="contained"
                    >
                      Share My Profile
                    </Button>
                  </Box>
                </div>
              </Box>
            </Box>
            <MyAnalytics />

            {/* /////TABS//////////// */}

            <Box paddingX={{ xs: 2, md: 6 }}>
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
                <div className="pt-5 pb-6  ">
                  {/* Personnal Info */}
                  <p className="text-black font-[500]">Personal information</p>
                  <hr className="my-3" />
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
                  {!posts?.data ? (
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
                      <Typography
                        sx={{ fontSize: "12px", textAlign: "center" }}
                      >
                        Recent posts shared by{firstName} will be displayed
                        here.
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
        </Stack>
      </SettingsLayout>

      {!isProfileCompleted && (
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              ...style,
              background: `url(${logo})`,
              backgroundRepeat: "no-repeat",
              bgcolor: "#fff",
              backgroundPositionX: "300px",
              backgroundPositionY: "80px",
              backgroundSize: "200px",
            }}
          >
            <Typography sx={{ fontSize: "14px" }}>
              Profile Level{" "}
              <span className="text-primary font-[600]">40% of 100</span>
              <br />
              Complete your profile to start using Golvia app
            </Typography>
            <Link to={PATHS.GET_STARTED}>
              <Button variant="contained" sx={{ mt: 3 }}>
                Get Started
              </Button>
            </Link>
          </Box>
        </Modal>
      )}

      <EditCoverPhoto
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  );
};

export default ProfileSettings;

const MyAnalytics = () => {
  const { data, loading } = useGetApi(getActivityStat);

  const { impressions, postImpressions, profileViews } = data?.data || [];

  return (
    <>
      <Box paddingX={{ xs: 2, md: 6 }}>
        <Box
          sx={{ mt: 3, p: 2, borderRadius: "10px", bgcolor: "#F3F6FC", pb: 0 }}
        >
          <Typography sx={{ fontWeight: 500, fontSize: "20px" }}>
            Analytics
          </Typography>
          <div className="flex items-center gap-x-3">
            <HiOutlineEye />{" "}
            <Typography sx={{ color: "#3E444C" }}>Private to you</Typography>
          </div>

          <Divider sx={{ mt: 1, mx: -2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Box sx={{ flex: 1, px: 2, boxSizing: "border-box", py: 2 }}>
              <Link to={PATHS.ACTIVITY_STAT.MY_PROFILE_VIEWS}>
                <div className="flex gap-x-3">
                  <div>
                    <img src={icons.analyticsUser} />
                  </div>
                  <div>
                    {" "}
                    <Link to={PATHS.ACTIVITY_STAT.MY_PROFILE_VIEWS}>
                      <InputLabel
                        sx={{
                          fontWeight: 500,
                          color: "#0A0A0A",
                          cursor: "pointer",
                          "&:hover": { textDecoration: "underline" },
                          fontSize: "14px",
                        }}
                      >
                        {profileViews || 0} profile views{" "}
                      </InputLabel>
                    </Link>
                    <Typography sx={{ fontSize: "12px" }}>
                      See people who view your profile
                    </Typography>
                  </div>
                </div>
              </Link>
            </Box>
            <Box
              sx={{
                flex: 1,
                px: 2,
                py: 2,
                boxSizing: "border-box",
                borderLeft: { xs: "none", md: "1px solid #CCCCCC" },
              }}
            >
              <div className="flex gap-x-3">
                <div>
                  <img src={icons.analyticsVideo} />
                </div>
                <div>
                  <Typography
                    sx={{ fontWeight: 500, color: "#0A0A0A", fontSize: "14px" }}
                  >
                    {impressions || 0} watch your video
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    See people who watch your video
                  </Typography>
                </div>
              </div>
            </Box>
            <Box
              sx={{
                flex: 1,
                px: 2,
                boxSizing: "border-box",
                borderLeft: { xs: "none", md:  "1px solid #CCCCCC" },
                py: 2,
              }}
            >
              <div className="flex gap-x-3">
                <div>
                  <img src={icons.analyticsBar} />
                </div>
                <div>
                  <Typography
                    sx={{ fontWeight: 500, color: "#0A0A0A", fontSize: "14px" }}
                  >
                    {postImpressions || 0} Impression
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    See people who saw/like your post{" "}
                  </Typography>
                </div>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
