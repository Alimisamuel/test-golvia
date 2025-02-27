import {
  Box,
  Button,
  CircularProgress,
  Divider,
  InputLabel,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import { getSettings } from "api/profile";
import { resendOtp, verifyOtp } from "api/auth";
import { toggle2faAuth } from "api/settings";
import useAlert from "components/alert/useAlert";
import SettingsLayout from "layouts/SettingsLayout";
import OtpInput from "pages/auth/OtpInput";
import useAuthDetails from "pages/auth/useAuthDetails";
import { maskEmail } from "pages/auth/VerifyOtp";
import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const PasswordResetSettings = () => {
  const [authValue, setAuthValue] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  // const handleResetPassword = async () =>{
  //   setIsLoading(true)
  //   await resetPassword(passwords.currentPassword)
  //   .then((res)=>{
  //         setIsLoading(false)
  //     setActiveStep(1)
  //   }).catch((err)=>{
  //      handleAlert({ message: `${err.message}`, variant: "error" });
  //          setIsLoading(false)
  //   })
  // }

  const handleGetSettings = async () => {
    await getSettings()
      .then((res) => {
        setAuthValue(res?.data?.has2FA);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetSettings();
  }, []);

  const handleToggle = async () => {
    setIsLoading(true);
    await toggle2faAuth(!authValue)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [activeStep, setActiveStep] = useState<number>(1);
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState<string>("");

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleAlert = useAlert();

  // const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    setIsLoading(true);
    await verifyOtp(email || "", otp)
      .then((res) => {
        console.log(res);
        localStorage.setItem("authToken", res?.data?.token);
      })
      .catch((err) => {
        console.log(err);
        handleAlert({ message: `${err.message}`, variant: "error" });
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

  const { email } = useAuthDetails();
  return (
    <SettingsLayout>
      <Stack
        direction="row"
        justifyContent="space-between"
        paddingY={4}
        paddingX={{ xs: 2, md: 6 }}
      >
        <Typography variant="h$24" className="font-medium">
          Request for Password Change
        </Typography>
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      {activeStep === 1 && (
        <Box paddingX={{ xs: 2, md: 6 }}>
          <Box sx={{ mt: 3, display: "flex", columnGap: 3, alignItems: "center" }}>
            <p className="font-[700] text-[18px]">Two-step verification</p>
            <Box sx={{ display: "flex", columnGap: 2, alignItems: "center" }}>
              <Switch value={authValue} onChange={handleToggle} />
              {isLoading && <CircularProgress size={20} />}
            </Box>
          </Box>
          <p className="mt-4 mb-8">
            We'll send a verification code to your email address <b>{maskEmail(email || "")}.</b>{" "}
            This email cannot be changed while being used for two-step verification. Services that
            have been granted access to your Golvia profile remain active and can be managed via
            your Permitted Services setting.
          </p>

          <Divider className="w-screen !ml-[-50px] " />
          <Stack spacing={3} width={{ md: "415px" }} paddingTop={4} paddingBottom={6}>
            <p className="font-[700] text-[18px]">Password Change</p>
            <TextField
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({
                  ...passwords,
                  currentPassword: e.target.value,
                })
              }
              placeholder="****************"
              type="password"
              label="Current Password"
              fullWidth
            />
            {/* <TextField
          placeholder="****************"
          type="password"
          label="New Password"
          fullWidth
        />
        <TextField
          placeholder="****************"
          type="password"
          label="Confirm Password"
          fullWidth
        /> */}
          </Stack>

          <Divider className="w-screen !ml-[-50px]" />

          <Box paddingY={4}>
            <Button
              disabled={!passwords.currentPassword}
              onClick={() => setActiveStep(2)}
              variant="contained"
              size="large"
              className="w-full md:w-[310px] h-[62px]"
            >
              Request for Change Password
            </Button>
          </Box>
        </Box>
      )}

      {activeStep === 2 && (
        <>
          <Typography sx={{ fontWeight: 500, fontSize: "27px", mt: 3 }}>
            2-Factor Authorization Login
          </Typography>
          <Typography sx={{ color: "#565656" }}>
            We sent you a password change request verification code to{" "}
            <span style={{ color: "#6A7280" }}></span>
            {maskEmail(email || "")}
          </Typography>
          <Box sx={{ mt: 2, width: "100%", mb: 7 }}>
            <form>
              <OtpInput value={otp} handleChange={handleChange} />
              {timeLeft <= 0 ? (
                <Button
                  startIcon={isLoading && <CircularProgress size={20} />}
                  onClick={handleResendOtp}
                  sx={{
                    color: "primary",
                    textDecoration: "underline",
                    mt: 4,
                  }}
                >
                  Resend OTP
                </Button>
              ) : (
                <InputLabel sx={{ mt: 4, fontSize: "14px" }}>
                  OTP Expires in {formatTime(timeLeft)}
                </InputLabel>
              )}

              <Button
                onClick={handleVerifyOtp}
                disabled={!email || !otp || otp.length < 6 || isLoading}
                variant="contained"
                sx={{ mt: 5, py: 1.5, borderRadius: "8px", color: "#fff", width: "240px" }}
              >
                {isLoading ? <CircularProgress size={20} /> : "Continue"}
              </Button>
            </form>
          </Box>
        </>
      )}
    </SettingsLayout>
  );
};

export default PasswordResetSettings;
