import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

interface CircularLoaderProps {
  value: number;
  size?: number | 40;
}

const CircularLoader = ({ value, size }: CircularLoaderProps) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        thickness={2}
        sx={{
          color: "#3EC28B",
        }}
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="#616E89"
          fontSize={14}
          fontWeight="normal"
        >{`${Math.round(value)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default CircularLoader;
