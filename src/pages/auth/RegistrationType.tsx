import {
  Box,
  Typography,
  Button,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import logo from "../../assets/logo/logo-white.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import stepperImg from "../../assets/imgs/stepper.svg";
import stepperImg2 from "../../assets/imgs/stepper2.svg";
import blackman from "../../assets/imgs/black.png";
import Grid from "@mui/material/Grid2";
import img2 from "../../assets/icons/registration_type/2.svg";
import img3 from "../../assets/icons/registration_type/3.svg";
import img5 from "../../assets/icons/registration_type/5.svg";
import img7 from "../../assets/icons/registration_type/7.svg";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PATHS } from "../../Routes/routes.path";
import { SPORTS } from "../../assets/data/data";
import { submitReferral } from "../../api/referral";
import { registrationType } from "api/profile";
import { useAppDispatch } from "store/hooks";
import { updateAsync } from "../../api/slice/auth";

type RegistrationTypeOption = {
  label: string;
  icon: string;
  value: string;
};

export type ProfileSectionKeysMap = {
  ATHLETES: string;
  SCOUT: string;
  TEAM: string;
  FANBASE: string;
};
const selectTypes: RegistrationTypeOption[] = [
  {
    label: "Athlete",
    icon: img5,
    value: "ATHLETES",
  },
  {
    label: "Scout",
    icon: img2,
    value: "SCOUT",
  },
  {
    label: "Team",
    icon: img3,
    value: "TEAM",
  },
  {
    label: "Fan",
    icon: img7,
    value: "FANBASE",
  },
];

const RegistrationType = () => {
  const [animate, setAnimate] = useState(false);
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  const [
    registration_type,
    setRegistrationType,
  ] = useState<RegistrationTypeOption | null>(null);

  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fullnameFromUrl = queryParams.get("fullname");
    const emailFromUrl = queryParams.get("email");

    if (fullnameFromUrl) setFullName(fullnameFromUrl);
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, [location]);

  const [referralCode, setReferralCode] = useState<string | null>("");

  React.useEffect(() => {
    const storedRef: string | null = localStorage.getItem("referral_code");
    if (storedRef) {
      setReferralCode(storedRef);
    }
  }, []);

  const handleSubmitReferral = async () => {
    await submitReferral(email, referralCode || "")
      .then((res) => {
        console.log("Referral code submitted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [reg_type, setRegType] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const teamName = "";

  const [favouriteSport, setFavouriteSport] = useState<string[]>([]);

  const handleSelectFavourite = (sport: string) => {
    if (favouriteSport.includes(sport)) {
      setFavouriteSport(favouriteSport.filter((s) => s !== sport));
    } else {
      if (favouriteSport.length < 3) {
        setFavouriteSport([...favouriteSport, sport]);
      }
    }
  };

  const handleSelectOneSport = (sport: string) => {
    setFavouriteSport([sport]);
  };

  const handleRegistrationType = async () => {
    handleSubmitReferral();
    setisLoading(true);
    const joinedSport = favouriteSport.join(", ");
    await registrationType(email, reg_type, joinedSport, teamName)
      .then((res) => {
        localStorage.setItem(
          "golvia_user_name",
          res?.data?.data?.user?.fullname
        );
        navigate(PATHS.ACCOUNT_SUCCESSFUL);
        handleUpdate();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    try {
      await dispatch(updateAsync()).unwrap();
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", overflow: "scroll" }}>
      <Box
        sx={{
          width: { lg: "30%", md: "30%", sm: "0%", xs: "0%" },
          bgcolor: "#F3F7FF",
          height: "100vh",
          display: { lg: "block", md: "block", sm: "none", xs: "none" },
        }}
      >
        <Box
          sx={{
            width: "85%",
            margin: "0 auto",
            pt: 8,
            pb: 4,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

                columnGap: 1.7,
              }}
            >
              <Link to="/">
                <img src={logo} alt="Golvia_logo" width={40} />
              </Link>
              <Box
                sx={{ overflowX: "hidden", height: "100%" }}
                className="hide_scrollbar"
              >
                <Typography
                  className={`text-container ${animate ? "animate" : ""}`}
                  sx={{
                    fontSize: "26px",
                    fontWeight: 500,
                    height: "100%",
                    color: "#000",
                  }}
                >
                  Golvia
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 8 }}>
              <Typography
                sx={{
                  color: "#14376A",
                  fontWeight: 600,
                  fontSize: "25px",
                  lineHeight: "32px",
                }}
              >
                Create your account in a few clicks
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mt: 5 }}>
            {activeStep === 1 ? (
              <img src={stepperImg} width={"50%"} alt="stepper_progress" />
            ) : (
              <img src={stepperImg2} width={"50%"} alt="stepper_progress" />
            )}
          </Box>
          <Box sx={{ mt: 5 }}>
            <img src={blackman} width={"100%"} alt="stepper_progress" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: { lg: "70%", md: "80%", sm: "100%", xs: "100%" },
          margin: "0 auto",
          py: 8,
        }}
      >
        {/* =========================REGISTRATION TYPE ==========================
=======================
======================================================================= */}

        {activeStep === 1 && (
          <Box
            sx={{
              width: { lg: "60%", md: "60%", sm: "80%", xs: "80%" },
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "27px",
                  textAlign: "center",
                }}
              >
                Hello, {fullName} 👋{" "}
              </Typography>
              <Typography sx={{ color: "#565656", mt: 2, textAlign: "center" }}>
                Select your profile type{" "}
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mt: 3 }}>
              <Grid container spacing={2}>
                {selectTypes?.map((type, i) => (
                  <Grid size={{ lg: 3, md: 3, sm: 6, xs: 6 }} key={i}>
                    <Box
                      onClick={() => {
                        setRegistrationType(type);
                        setRegType(type.value);
                      }}
                      sx={{
                        border: "1px solid #d4d4d4",
                        borderRadius: "12px",
                        height: "150px",
                        p: 2,
                        transition: "0.2s all linear",
                        cursor: "pointer",
                        "&:hover": {
                          border: "1px solid",
                          borderColor: "primary.main",
                        },
                        ...(registration_type === type && {
                          border: "1px solid ",
                          borderColor: "primary.main",
                        }),
                      }}
                    >
                      {registration_type === type && (
                        <Box sx={{ display: "grid", placeItems: "end" }}>
                          <IoIosCheckmarkCircle style={{ color: "#3373E0" }} />
                        </Box>
                      )}
                      <Box
                        sx={{ mt: 2, display: "grid", placeItems: "center" }}
                      >
                        <Box
                          sx={{
                            bgcolor: "#7474741a",
                            height: "50px",
                            width: "50px",
                            borderRadius: "50%",
                            display: "grid",
                            placeItems: "center",
                          }}
                        >
                          <img src={type?.icon} alt="an icon" width={22} />
                        </Box>
                      </Box>
                      <Typography
                        sx={{
                          textAlign: "center",
                          fontSize: "14px",
                          fontWeight: 500,
                          mt: 2,
                        }}
                      >
                        {type?.label}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ margin: "0 auto", width: "70%", mt: 9 }}>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={!registration_type}
                  sx={{
                    py: 1.5,
                    borderRadius: "8px",
                    color: "#fff",

                    boxShadow: "none",
                  }}
                  onClick={() => setActiveStep(2)}
                >
                  Proceed
                </Button>
              </Box>
            </Box>
          </Box>
        )}

        {/* =========================SPORT TYPE ==========================
=======================
======================================================================= */}

        {activeStep === 2 && (
          <Box
            sx={{
              width: { lg: "50%", md: "60%", sm: "80%", xs: "80%" },
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{
                bgcolor: "#7474741a",
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                display: "grid",
                placeItems: "center",
              }}
            >
              <img src={registration_type?.icon} alt="an icon" width={22} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: "27px",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Hello, {fullName} 👋{" "}
              </Typography>
              <Typography sx={{ color: "#565656", mt: 2, textAlign: "center" }}>
                Choose your sport interests
                <br />
                <b style={{ fontSize: "12px", fontWeight: 500 }}>
                  {" "}
                  {registration_type === selectTypes[3]
                    ? " You  may select up to 3"
                    : "You can only select 1 sport"}
                </b>
              </Typography>
            </Box>
            <Box sx={{ width: "100%", mt: 3 }}>
              {/* <InputLabel
                sx={{
                  color: "#3e3e3e",
                  fontSize: "12px",
                  fontWeight: 500,
                  mt: 1,
                }}
              >
                Sport type
              </InputLabel> */}
              {/* <TextField
                fullWidth
                margin="dense"
                select
                slotProps={{
                  input: {
                    style: {
                      borderRadius: "8px",
                    },
                  },
                }}
              >
                {SPORTS.map((sport, index) => (
                  <MenuItem
                    onClick={() => {
                      setSportType(sport);
                    }}
                    key={index}
                    value={sport}
                  >
                    {sport}
                  </MenuItem>
                ))}
              </TextField> */}

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {SPORTS?.map((sport, index) => {
                  const isSelected = favouriteSport.includes(sport);
                  return (
                    <ListItemButton
                      onClick={() => {
                        if (registration_type === selectTypes[3]) {
                          handleSelectFavourite(sport);
                        } else {
                          handleSelectOneSport(sport);
                        }
                      }}
                      key={index}
                      selected={isSelected}
                      sx={{
                        whiteSpace: "nowrap",
                        fontSize: "12px",
                        border: "1px solid",
                        borderColor: "gray.border",
                        color: "#6A7280",
                        borderRadius: "6px",
                        "&.Mui-selected": {
                          borderColor: "#88AFEE",
                          color: "#1D69D8",
                        },
                      }}
                    >
                      {sport}
                    </ListItemButton>
                  );
                })}
              </Box>
              <Box sx={{ margin: "0 auto", width: "70%", mt: 9 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: "8px",
                    color: "#fff",

                    boxShadow: "none",
                  }}
                  disabled={!email || !reg_type || !favouriteSport || isLoading}
                  onClick={handleRegistrationType}
                >
                  {isLoading ? <CircularProgress size={20} /> : "Proceed"}
                </Button>
                <Button
                  onClick={() => {
                    setFavouriteSport([]);
                    setActiveStep(1);
                  }}
                  fullWidth
                  sx={{ mt: 2, textDecoration: "underline" }}
                >
                  Back to profile type
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RegistrationType;
