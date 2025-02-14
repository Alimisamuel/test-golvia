import React, { useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import googleIcon from "../../../assets/icons/google_icon.webp";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackdropLoader from "components/loaders/Backdrop";
import { loginWithGoogleAsync, selectAuth } from "../slice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PATHS } from "Routes/routes.path";

// type LocationState = {
//   redirectTo?: string;
//   from?: {
//     pathname?: string;
//   };
// };

const GoogleLogin: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading] = useState<boolean>(false);

  const handleAlert = (variant: "success" | "error" | "info" | "warning", message: string) => {
    enqueueSnackbar(message, { variant });
  };

  const authState = useAppSelector(selectAuth);
  const location = useLocation();

  const locationState = location.state;

  const from = location.state?.from?.pathname || "/";

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
      const result = await dispatch(
        loginWithGoogleAsync({
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
      console.log(result);

      if (result.user.user.profileType === null) {
        navigate(
          `${PATHS.REGISTRATION_TYPE}?fullname=${result.user.user.firstName}&email=${result.user.user.email}`
        );
      } else {
        navigate(from, { replace: true });
        if (locationState && locationState.redirectTo) {
          navigate(`${locationState?.redirectTo}`);
        } else {
          navigate(PATHS.FEED);
        }
      }
    } catch (err) {
      // Log the error and display an alert
      console.error("Login error:", err);
      handleAlert("error", authState?.error || "An unexpected error occurred");
    }
  };

  // const loginUserWithGoogle = async (email: string) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await loginGoogle(email); // Assuming loginGoogle is a function that returns a promise
  //     setIsLoading(false);

  //     if (res?.data?.status) {
  //       localStorage.setItem("userInfo", JSON.stringify(res?.data?.result[0]));
  //       dispatch(setUser(res?.data?.result[0])); // Assuming setUser is a Redux action

  //       if (locationState?.redirectTo) {
  //         navigate(locationState.redirectTo);
  //       } else {
  //         navigate("/");
  //       }
  //     } else {
  //       handleAlert("error", res?.data?.error_message || "An error occurred.");
  //     }
  //   } catch (err) {
  //     setIsLoading(false);
  //     console.error("Error during login:", err);
  //     handleAlert("error", "An error occurred during login.");
  //   }
  // };

  return (
    <>
      {isLoading && <BackdropLoader />}
      <Button
        onClick={() => login()}
        variant="outlined"
        disabled={authState.loading}
        fullWidth
        sx={{ mt: 4, py: 1.5, color: "#1a1a1a", borderRadius: "8px" }}
        startIcon={<img src={googleIcon} alt="google icon" width={30} />}
      >
        {/* <img src={GoogleIcon} width={20} alt="Google Icon" />{" "} */}
        <Typography sx={{ ml: 1, color: "#151515", fontSize: "14px" }}>
          {authState.loading ? <CircularProgress size={20} /> : "  Continue with Google"}
        </Typography>
      </Button>
    </>
  );
};

export default GoogleLogin;
