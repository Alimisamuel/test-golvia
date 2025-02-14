import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { ReactNode, useState, useEffect } from "react";
import logo from "../assets/logo/logo-text-white.svg";
import logo2 from "../assets/logo/logo-white.svg";
import { Link } from "react-router-dom";
// import authText from "../assets/imgs/auth_text.svg";
// import authHero from "../assets/imgs/auth_hero.png";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger the animation after the component mounts
    setAnimate(true);
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box sx={{ display: "flex", height: "100vh" }} className="hide_scrollbar">
      {isMobile ? (
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              columnGap: 1.7,
              mt: 5,
              mb: 6,
            }}
          >
            <Box sx={{}}>
              <Link to="/">
                <img src={logo2} alt="Golvia_logo" width={40} />
              </Link>
            </Box>

            <Box sx={{ overflowX: "hidden", height: "40px" }} className="hide_scrollbar">
              <Typography
                className={`text-container ${animate ? "animate" : ""}`}
                sx={{ fontSize: "30px", fontWeight: 500, height: "100%", color: "#000" }}
              >
                Golvia
              </Typography>
            </Box>
          </Box>
          {children}
        </Box>
      ) : (
        <>
          <Box sx={{ backgroundColor: "#174CAB", width: "40%", height: "100%" }}>
            <Box
              sx={{
                width: { lg: "85%", md: "85%", sm: "90%", xs: "95%" },
                margin: "0 auto",
                py: 8,
                display: "grid",
                placeContent: "center",
                height: "100%",
              }}
            >
              <Box>
                <img src={logo} alt="golvia-logo" width={200} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "60%", height: "100%", overflow: "scroll" }} className="hide_scrollbar">
            {children}
          </Box>
        </>
      )}
    </Box>
  );
};

export default AuthLayout;
