import {
  Box,
  Button,
  Checkbox,
  Divider,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useState, ChangeEvent, useEffect } from "react";
import AuthLayout from "../../layouts/AuthLayout";
import Grid from "@mui/material/Grid2";
import { Link, useNavigate } from "react-router-dom";
import CountrySelect from "../../components/input/CountrySelect";
import { PATHS } from "../../Routes/path";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { registerUser } from "../../api/auth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleSignup from "./SocialAuth/GoogleSignup";
import useAlert from "components/alert/useAlert";

// Email validation function
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;

  return passwordRegex.test(password);
};

const Signup = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirm: "",
    country: "",
    terms: false,
  });
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const { email, password, confirm, country, terms } = userDetails;
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmError, setConfirmError] = useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");

  const params = new URLSearchParams(window.location.search);
  const refNumber = params.get("ref");

  useEffect(() => {
    if (refNumber) {
      localStorage.setItem("referral_code", refNumber);
      console.log("Referral code saved:", refNumber);
    }
  }, [refNumber]);

  const validateName = (
    name: string,
    setError: React.Dispatch<React.SetStateAction<string>>
  ): boolean => {
    const regex = /^[a-zA-Z\s'-]*$/;

    if (name.length > 50) {
      setError("Name cannot exceed 50 characters.");
      return false;
    } else if (!regex.test(name)) {
      setError(
        "Invalid characters detected. Only letters, spaces, hyphens, and apostrophes are allowed."
      );
      return false;
    }

    setError(""); // Clear error
    return true;
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    if (validateName(input, setFirstNameError)) {
      setFirstName(input);
    }
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target.value;
    if (validateName(input, setLastNameError)) {
      setLastName(input);
    }
  };

  const handleBlur = (
    name: string,
    setName: React.Dispatch<React.SetStateAction<string>>
  ): void => {
    const formattedName = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    setName(formattedName);
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const navigate = useNavigate();

  const handleCountryChange = (newValue: string) => {
    setUserDetails({
      ...userDetails,
      country: newValue,
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setUserDetails({
      ...userDetails,
      email: inputEmail,
    });

    // Validate email and set error message if invalid
    if (inputEmail && !validateEmail(inputEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPassword = e.target.value;
    setUserDetails({
      ...userDetails,
      password: inputPassword,
    });

    // Validate password and set error message if invalid
    if (inputPassword && !validatePassword(inputPassword)) {
      setPasswordError(
        "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputConfirm = e.target.value;
    setUserDetails({
      ...userDetails,
      confirm: e.target.value,
    });

    if (inputConfirm !== password) {
      setConfirmError("Password must match");
    } else {
      setConfirmError("");
    }
  };

  const handleAlert = useAlert();

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    await registerUser(firstName, lastName, email, password, country)
      .then((res) => {
        navigate(
          `${PATHS.VERIFY_OTP}?fullname=${res?.data?.data?.user?.firstName}&email=${res?.data?.data?.user?.email}`
        );
      })
      .catch((err) => {
        console.log(err);
        handleAlert({
          message: `${err.response.data.message}`,
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          width: { lg: "53%", md: "53%", sm: "80%", xs: "90%" },
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 8,
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "27px" }}>
          Welcome to Golvia 👋{" "}
        </Typography>
        <Typography sx={{ color: "primary.main", mt: 0 }}>
          Sports, Networking and Technology
        </Typography>
        <GoogleOAuthProvider clientId={clientId ?? ""}>
          <GoogleSignup />
        </GoogleOAuthProvider>

        <Divider sx={{ width: "100%", my: 3, mt: 5 }}>
          <Typography sx={{ color: "#565656", mx: 2 }}>
            {" "}
            Sign up with email address
          </Typography>
        </Divider>

        <Box sx={{ mt: 2, width: "100%" }}>
          <form>
            <Grid container spacing={2}>
              <Grid size={{ lg: 6, md: 6, xs: 12, sm: 12 }}>
                <InputLabel
                  htmlFor="name"
                  sx={{ color: "#3e3e3e", fontSize: "12px", fontWeight: 500 }}
                >
                  First Name{" "}
                </InputLabel>
                <TextField
                  fullWidth
                  value={firstName}
                  onChange={handleFirstNameChange}
                  onBlur={() => handleBlur(firstName, setFirstName)}
                  // error={firstNameError}
                  helperText={firstNameError}
                  margin="dense"
                  placeholder="Chike "
                  slotProps={{
                    input: {
                      style: {
                        borderRadius: "9px",
                        height: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ lg: 6, md: 6, xs: 12, sm: 12 }}>
                <InputLabel
                  sx={{ color: "#3e3e3e", fontSize: "12px", fontWeight: 500 }}
                >
                  Last Name{" "}
                </InputLabel>
                <TextField
                  fullWidth
                  value={lastName}
                  onChange={handleLastNameChange}
                  onBlur={() => handleBlur(lastName, setLastName)}
                  helperText={lastNameError}
                  // error={lastNameError}
                  margin="dense"
                  placeholder="Sammy"
                  slotProps={{
                    input: {
                      style: {
                        borderRadius: "9px",
                        height: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <InputLabel
              sx={{
                color: "#3e3e3e",
                fontSize: "12px",
                fontWeight: 500,
                mt: 1,
              }}
            >
              Country
            </InputLabel>
            <CountrySelect
              handleCountryChange={handleCountryChange}
              defaultValues="Nigeria"
            />

            <InputLabel
              sx={{
                mt: 2,
                color: "#3e3e3e",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              Email Address
            </InputLabel>
            <TextField
              fullWidth
              margin="dense"
              value={email}
              onChange={handleEmailChange}
              placeholder="example@gmail.com"
              error={!!emailError} // Adds error state if email is invalid
              helperText={emailError} // Shows helper text when email is invalid
              InputProps={{
                style: {
                  borderRadius: "9px",
                  height: "50px",
                  fontSize: "12px",
                  fontWeight: 500,
                },
              }}
            />

            <Grid container columnSpacing={2}>
              <Grid size={{ lg: 6, md: 6, xs: 12, sm: 12 }}>
                <Box>
                  <InputLabel
                    sx={{
                      mt: 2,
                      color: "#3e3e3e",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Create Password
                  </InputLabel>
                  <TextField
                    fullWidth
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    error={!!passwordError} // Adds error state if email is invalid
                    helperText={passwordError}
                    margin="dense"
                    placeholder="**************"
                    InputProps={{
                      style: {
                        borderRadius: "9px",
                        height: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{ fontSize: "16px" }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{ fontSize: "16px" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
              <Grid size={{ lg: 6, md: 6, xs: 12, sm: 12 }}>
                <Box>
                  <InputLabel
                    sx={{
                      mt: 2,
                      color: "#3e3e3e",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Confirm Password
                  </InputLabel>
                  <TextField
                    fullWidth
                    error={!!confirmError} // Adds error state if email is invalid
                    helperText={confirmError}
                    type={showPassword ? "text" : "password"}
                    value={confirm}
                    onChange={handleConfirmPasswordChange}
                    margin="dense"
                    placeholder="**************"
                    InputProps={{
                      style: {
                        borderRadius: "9px",
                        height: "50px",
                        fontSize: "12px",
                        fontWeight: 500,
                      },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon
                                sx={{ fontSize: "16px" }}
                              />
                            ) : (
                              <VisibilityOffOutlinedIcon
                                sx={{ fontSize: "16px" }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                alignItems: "center",
                columnGap: 1,
              }}
            >
              <Checkbox
                value={terms}
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    terms: e.target.checked,
                  })
                }
              />
              <Typography sx={{ fontSize: "12px", color: "#292929" }}>
                Accept{" "}
                <Link to={PATHS.TERMS_OF_USE} style={{ color: "#1D69D8" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to={PATHS.PRIVACY_POLICY} style={{ color: "#1D69D8" }}>
                  Privacy Policy
                </Link>
              </Typography>
            </Box>

            <Button
              onClick={handleRegister}
              disabled={
                !firstName ||
                !lastName ||
                !email ||
                !password ||
                !confirm ||
                !country ||
                !!emailError ||
                !terms ||
                !!passwordError ||
                !!confirmError ||
                isLoading
              }
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "8px",
                color: "#fff",
              }}
            >
              {isLoading ? <CircularProgress size={20} /> : "Get Started"}
            </Button>

            <Typography sx={{ mt: 3, fontSize: "14px", mb: 5 }}>
              Already have an account?
              <Link to={PATHS.LOGIN}>
                {" "}
                <b style={{ color: "#1D69D8" }}>Login</b>
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Signup;
