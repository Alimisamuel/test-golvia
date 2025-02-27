import {
  Box,
  Button,
  Typography,
  Avatar,
  InputLabel,
  Divider,
  Skeleton,
} from "@mui/material";
import BackdropLoader from "components/loaders/Backdrop";

import { selectAuth, updateAsync } from "api/slice/auth";
import useAuthDetails from "pages/auth/useAuthDetails";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/path";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { FaCircleCheck } from "react-icons/fa6";

const ProfileCompleted = () => {
  const dispatch = useAppDispatch();

  const handleUpdate = async () => {
    try {
      await dispatch(updateAsync()).unwrap();
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const authState = useAppSelector(selectAuth);

  useEffect(() => {
    handleUpdate();
  }, []);

  const {
    firstName,
    lastName,
    profileDetails,
    sportType,
    asset,
  } = useAuthDetails();
  return (
    <>
      {authState.loading && <BackdropLoader />}
      <Box
        sx={{
          width: "90%",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          mt: 7,
          height: { md: "60vh", xs: "auto" },
          justifyContent: "space-between",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column",
          },
          rowGap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h3"
            sx={{ color: "text.primary", fontSize: "40px", fontWeight: 500 }}
          >
            Congrats!  🎉
          </Typography>
          <Typography sx={{ mt: 1, fontWeight: 500, fontSize: "20px" }}>
            you have successfully updated your profile
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary" }}>
            Start networking on Golvia without restriction{" "}
          </Typography>
          <Link to={PATHS.FEED}>
            <Button sx={{ mt: 5, width: "250px", py: 1.5 }} variant="contained">
              Continue
            </Button>
          </Link>
        </Box>
        <Box>
          <Box
            sx={{
              boxSizing: "border-box",
              width: "350px",
              border: "0.5px solid",
              borderColor: "gray.lighter",

              borderRadius: "15px",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: 3, p: 3 }}
            >
              <div className="relative">
                <Avatar
                  src={asset?.profilePictureUrl}
                  sx={{ width: 60, height: 60 }}
                />
                <div className="w-6 h-6x bg-white rounded-full absolute top-0 left-11 border-white border-4">
                  <FaCircleCheck className=" text-nonenary" />
                </div>
              </div>
              <Box>
                {authState?.loading ? (
                  <Skeleton
                    width={200}
                    variant="rectangular"
                    animation="wave"
                  />
                ) : (
                  <InputLabel
                    sx={{ fontWeight: 500, fontSize: "18px", color: "#000" }}
                  >
                    {`${firstName} ${lastName}`}
                  </InputLabel>
                )}

                <Typography>{sportType || "--"}</Typography>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ p: 3 }}>
              <Typography sx={{ color: "text.disabled" }}>
                Location:{" "}
                <span className="text-black">
                  {profileDetails?.address || "--"}
                </span>
              </Typography>

              {/* <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: "text.disabled" }}>
                  Scout Region:
                </Typography>
                <Box sx={{ mt: 1, alignItems: "center", columnGap: 2 }}>
                  <Box
                    sx={{
                      bgcolor: "primary.light",
                      width: "fit-content",
                      px: 2,
                      py: 0.3,
                      borderRadius: "4px",
                    }}
                  >
                    <Typography sx={{ fontSize: "12px" }}>Attacker</Typography>
                  </Box>
                </Box>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfileCompleted;
