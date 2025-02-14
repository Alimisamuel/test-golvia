import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import images from "../constants/images";
import { Link } from "react-router-dom";
import { PATHS } from "../Routes/routes.path";

const NoPage = () => {
  return (
    <div>
      <Helmet>
        <title>No Page | Golvia</title>
      </Helmet>

      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1">404 </Typography>
        <Typography>Page not found</Typography>
        <img src={images.players} width={400} />
        <Link to={PATHS.FEED}>
          <Button
            variant="outlined"
            sx={{
              mt: 5,
              width: "250px",
              height: "50px",
              borderRadius: "10px",
              color: "#000",
              borderColor: "#333",
              borderWidth: "0.5px",
            }}
          >
            Back Home
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default NoPage;
