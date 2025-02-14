import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/logo/border-logo.svg";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../Routes/routes.path";

const AccountSuccessfully = () => {
  const [progress, setProgress] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          navigate(PATHS.FEED);
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        bgcolor: "#F3F7FF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={logo} alt="golvia_logo" width={120} />
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mt: 8,
          fontSize: { lg: "30px", md: "30px", sm: "20px", xs: "20px" },
        }}
      >
        Your Golvia Account has been <br />
        created successfully
      </Typography>

      <Box sx={{ width: { lg: "40%", md: "40%", sm: "60%", xs: "80%" }, mt: 5 }}>
        <LinearProgress color="secondary" value={progress} variant="determinate" />
      </Box>
      <Typography sx={{ mt: 7 }}>Setting up your profile page</Typography>
    </Box>
  );
};

export default AccountSuccessfully;
