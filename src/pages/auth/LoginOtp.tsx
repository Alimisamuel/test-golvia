import {
  Box,
  Button,
  CircularProgress,
  Typography,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "layouts/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "Routes/routes.path";
import OtpInput from "pages/auth/OtpInput";
import useAlert from "components/alert/useAlert";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { login2FactorAsync, selectAuth } from "../../api/slice/auth";

const LoginOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string | null>(null);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromUrl = queryParams.get("email");

    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setMaskedEmail(maskEmail(emailFromUrl)); // Apply the masking function
    }
  }, [location]);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleAlert = useAlert();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);

  const handleVerifyOtp = async () => {
    try {
      const response = await dispatch(
        login2FactorAsync({ email, otp })
      ).unwrap();
      if (response?.token) {
        navigate(PATHS.FEED);
      }
    } catch (err) {
      handleAlert({ message: `${authState.error}`, variant: "error" });
    }
  };
  // const handleResendOtp = async () => {
  //   try {
  //     const response = await dispatch(login2FactorAsync({ email, otp })).unwrap();
  //     if (response?.token) {
  //       navigate(from, { replace: true });
  //       if (locationState && locationState.redirectTo) {
  //         navigate(`${locationState?.redirectTo}`);
  //       } else {
  //         navigate(PATHS.FEED);
  //       }
  //     }
  //   } catch (err) {
  //     handleAlert({ message: `${authState.error}`, variant: "error" });
  //   }
  // };

  const initialTime = 4 * 60 + 59;
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);

  React.useEffect(() => {
    // Stop the countdown when timeLeft reaches zero
    if (timeLeft <= 0) return;

    // Set an interval to decrease timeLeft every second
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format the time as MM:SS
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          width: { lg: "53%", md: "53%", sm: "80%", xs: "85%" },
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // alignItems: "center",
          height: { lg: "100%", md: "100%", sm: "auto", xs: "auto" },
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "27px" }}>
          2-Factor Authorization Login
        </Typography>
        <Typography sx={{ color: "#565656", mt: 2 }}>
          We have sent you a verification code to{" "}
          <span style={{ color: "#6A7280" }}></span>
          {maskedEmail}
        </Typography>

        <Box sx={{ mt: 2, width: "100%" }}>
          <form>
            <OtpInput value={otp} handleChange={handleChange} />
            {timeLeft <= 0 ? (
              <Button
                sx={{ color: "primary", textDecoration: "underline", mt: 2 }}
              >
                Resend OTP
              </Button>
            ) : (
              <InputLabel sx={{ mt: 2 }}>
                OTP Expires in {formatTime(timeLeft)}
              </InputLabel>
            )}

            <Button
              onClick={handleVerifyOtp}
              disabled={!email || !otp || otp.length < 6 || authState.loading}
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: "8px", color: "#fff" }}
            >
              {authState.loading ? <CircularProgress size={20} /> : "Continue"}
            </Button>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginOtp;

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");

  // Mask part of the local part and the domain
  const maskedLocalPart = localPart.slice(0, 3) + "******";
  const maskedDomain = "***." + domain.split(".")[1];

  return `${maskedLocalPart}@${maskedDomain}`;
};
