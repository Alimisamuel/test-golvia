import MarketLayout from "layouts/MarketLayout";
import React from "react";

import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/path";
import Icons from "constants/Icons";

const MarketPlace = () => {
  return (
    <MarketLayout>
      <Box
        paddingY={4}
        borderRadius="16px"
        className="*:xs:!px-4 *:md:!px-8 bg-white flex flex-col items-center justify-center"
        style={{ border: "0.5px solid #dfdeda ", height: "85vh" }}
      >
        <img src={Icons.cart} />
        <Typography sx={{ fontSize: "25px", mt: 2 }}>
          Golvia Marketplace
        </Typography>
        <Typography sx={{ fontSize: "18px" }}>Coming Soon</Typography>
        <Link to={PATHS.FEED}>
          <Button
            variant="outlined"
            sx={{ mt: 2, borderRadius: "8px", py: 1, width: "200px" }}
          >
            Back to home
          </Button>
        </Link>
        <Box sx={{ width: "100%", display: "flex", columnGap: 4, mt: 5 }}>
          <Box
            sx={{
              bgcolor: "#F3F6FC",
              height: "200px",
              width: "50%",
              borderRadius: "12px",
            }}
          />
          <Box
            sx={{
              bgcolor: "#F3F6FC",
              height: "200px",
              width: "50%",
              borderRadius: "12px",
            }}
          />
        </Box>
      </Box>
    </MarketLayout>
  );
};

export default MarketPlace;
