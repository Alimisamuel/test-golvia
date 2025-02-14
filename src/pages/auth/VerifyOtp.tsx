import { Box, Button, CircularProgress, Typography, InputLabel } from "@mui/material";
import React, { useState } from "react";
import AuthLayout from "layouts/AuthLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "Routes/routes.path";
import { resendOtp, verifyOtp } from "api";
import OtpInput from "pages/auth/OtpInput";
import useAlert from "components/alert/useAlert";

const VerifyOtp: React.FC = () => {
  const [otp, setOtp] = useState<string>("");
  const location = useLocation();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [maskedEmail, setMaskedEmail] = useState<string | null>(null);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const fullnameFromUrl = queryParams.get("fullname");
    const emailFromUrl = queryParams.get("email");

    if (fullnameFromUrl) setFullName(fullnameFromUrl);
    if (emailFromUrl) {
      setEmail(emailFromUrl);
      setMaskedEmail(maskEmail(emailFromUrl)); // Apply the masking function
    }
  }, [location]);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleAlert = useAlert();

  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    await verifyOtp(email, otp)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res?.data?.token);
        navigate(
          `${PATHS.REGISTRATION_TYPE}?fullname=${res?.data?.data?.user?.firstName}&email=${res?.data?.data?.user?.email}`
        );
      })
      .catch((err) => {
        console.log(err);
        handleAlert({
          message: `${err.message.includes("Request") ? "We apologize for the inconvenience. We are working to resolve the issue. Please try again later." : err.Messages}`,
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleResendOtp = async () => {
    setIsLoading(true);
    await resendOtp()
      .then((res) => {
        console.log(res);
        handleAlert({
          message: `An OTP has been sent to your registered email`,
          variant: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        handleAlert({ message: `${err.message}`, variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
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
        <Typography sx={{ fontWeight: 500, fontSize: "27px" }}>Hello, {fullName}</Typography>
        <Typography sx={{ color: "#565656", mt: 2 }}>
          We have sent you a verification code to <span style={{ color: "#6A7280" }}></span>
          {maskedEmail}
        </Typography>

        <Box sx={{ mt: 2, width: "100%" }}>
          <form>
            <OtpInput value={otp} handleChange={handleChange} />
            {timeLeft <= 0 ? (
              <Button
                startIcon={isLoading && <CircularProgress size={20} />}
                onClick={handleResendOtp}
                sx={{ color: "primary", textDecoration: "underline", mt: 2 }}
              >
                Resend OTP
              </Button>
            ) : (
              <InputLabel sx={{ mt: 2 }}>OTP Expires in {formatTime(timeLeft)}</InputLabel>
            )}

            <Button
              onClick={handleVerifyOtp}
              disabled={!email || !otp || otp.length < 6 || isLoading}
              variant="contained"
              fullWidth
              sx={{ mt: 3, py: 1.5, borderRadius: "8px", color: "#fff" }}
            >
              {isLoading ? <CircularProgress size={20} /> : "Continue"}
            </Button>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default VerifyOtp;

export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");

  // Mask part of the local part and the domain
  const maskedLocalPart = localPart.slice(0, 3) + "******";
  const maskedDomain = "***." + domain.split(".")[1];

  return `${maskedLocalPart}@${maskedDomain}`;
};
