import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputLabel,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthLayout from "../../layouts/AuthLayout";
import GoogleLogin from "./SocialAuth/GoogleLogin";
import { PATHS } from "../../routes/path";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { loginAsync, selectAuth } from "../../api/slice/auth";
import useAlert from "components/alert/useAlert";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = loginDetails;
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleAlert = useAlert();

  const locationState = location.state;
  // const from = locationState?.from?.pathname || "/";

  const handleLogin = async () => {
    try {
      const response = await dispatch(loginAsync({ email, password })).unwrap();

      if (!response?.token) {
        navigate(`${PATHS.LOGIN_OTP}?email=${email}`);
      } else {
        if (locationState?.redirectTo) {
          navigate(locationState.redirectTo);
        } else {
          navigate(PATHS.FEED, { replace: true });
        }
      }
    } catch (err) {
      const error = err as Error;
      handleAlert({ message: error.message, variant: "error" });
    }
  };

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
          height: { lg: "100%", md: "100%", sm: "auto", xs: "auto" },
          pb: 6,
        }}
      >
        <Typography sx={{ fontWeight: 500, fontSize: "27px" }}>
          Score Your Dream Goal
        </Typography>
        <Typography sx={{ mt: 0, textAlign: "center", color: "primary.main" }}>
          Sports, Networking, and Technology
        </Typography>
        <GoogleOAuthProvider clientId={clientId || ""}>
          <GoogleLogin />
        </GoogleOAuthProvider>

        <Divider sx={{ width: "100%", my: 3 }}>
          <Typography sx={{ color: "#565656", mx: 2 }}>
            Sign in with email address
          </Typography>
        </Divider>

        <Box sx={{ mt: 2, width: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <InputLabel>Email Address</InputLabel>
            <TextField
              fullWidth
              value={email}
              onChange={(e) =>
                setLoginDetails((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              margin="dense"
              placeholder="example@gmail.com"
              InputProps={{ style: { borderRadius: "9px" } }}
            />
            <InputLabel sx={{ mt: 2 }}>Password</InputLabel>
            <TextField
              fullWidth
              margin="dense"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) =>
                setLoginDetails((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              placeholder="**********"
              InputProps={{
                style: { borderRadius: "9px" },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
                      ) : (
                        <VisibilityOffOutlinedIcon sx={{ fontSize: "16px" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Link to={PATHS.FORGOT_PASSWORD}>
              <Typography
                sx={{ fontSize: "12px", mt: 1, textDecoration: "underline" }}
              >
                Forgot Password
              </Typography>
            </Link>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!email || !password || authState.loading}
              sx={{ mt: 3, py: 1.5, borderRadius: "8px", color: "#fff" }}
            >
              {authState.loading ? <CircularProgress size={20} /> : "Sign in"}
            </Button>

            <Typography sx={{ mt: 3, fontSize: "14px" }}>
              Don't have an account?{" "}
              <Link to={PATHS.SIGNUP}>
                <b style={{ color: "#1D69D8" }}>Create a free account</b>
              </Link>
            </Typography>
          </form>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
