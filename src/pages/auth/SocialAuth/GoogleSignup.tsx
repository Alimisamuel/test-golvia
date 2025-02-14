import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import googleIcon from "../../../assets/icons/google_icon.webp";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackdropLoader from "components/loaders/Backdrop";
import { registerGoogleAsync, selectAuth } from "../slice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PATHS } from "Routes/routes.path";

const GoogleSignup: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading] = useState<boolean>(false);

  const handleAlert = (variant: "success" | "error" | "info" | "warning", message: string) => {
    enqueueSnackbar(message, { variant });
  };

  const authState = useAppSelector(selectAuth);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const { sub, name, given_name, family_name, picture, email, email_verified } =
          userInfo?.data;
        handleLogin(sub, email, email_verified, name, picture, given_name, family_name);
      } catch (error) {
        console.error("Error fetching user info:", error);
        handleAlert("error", `Error fetching user info: ${String(error)}`);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      handleAlert("error", `Login failed: ${String(error)}`);
    },
  });
  const dispatch = useAppDispatch();
  const handleLogin = async (
    sub: string,
    email: string,
    email_verified: boolean,
    name: string,
    picture: string,
    given_name: string,
    family_name: string
  ) => {
    try {
      // Dispatch the loginWithGoogleAsync action and wait for the result
      const response = await dispatch(
        registerGoogleAsync({
          iss: "https://accounts.google.com",
          sub,
          email,
          email_verified,
          name,
          picture,
          given_name,
          family_name,
          locale: "en",
        })
      ).unwrap();
      console.log(response);
      const { firstName, profileType, email: userEmail } = response?.user?.user;
      if (profileType === null) {
        navigate(`${PATHS.REGISTRATION_TYPE}?fullname=${firstName}&email=${userEmail}`);
      } else {
        navigate(PATHS.FEED);
      }
    } catch (err) {
      // Log the error and display an alert
      console.error("Login error:", err);
      handleAlert("error", authState?.error || "An unexpected error occurred");
    }
  };

  return (
    <>
      {isLoading && <BackdropLoader />}
      <Button
        onClick={() => login()}
        variant="outlined"
        fullWidth
        disabled={authState.loading}
        sx={{ mt: 4, py: 1.5, color: "#1a1a1a", borderRadius: "8px" }}
        startIcon={<img src={googleIcon} alt="google icon" width={30} />}
      >
        {/* <img src={GoogleIcon} width={20} alt="Google Icon" />{" "} */}
        <Typography sx={{ ml: 1, color: "#151515", fontSize: "14px" }}>
          {authState.loading ? <CircularProgress size={20} /> : " Continue with Google"}
        </Typography>
      </Button>
    </>
  );
};

export default GoogleSignup;
