import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { getProfileViewed } from "api/profile";
import { useGetApi } from "api/hooks/useGetApi";
import AccessLayout from "layouts/AccessLayout";
import FeedLayout from "layouts/FeedLayout";
import { UserListSkeleton } from "pages/network/GlobalNetwork";
// import React from "react";
import { PATHS } from "Routes/path";
import FormatProfileType from "../Utils/FormatProfileType";
import images from "constants/images";
import useNavigateWithHash from "../hooks/useNavigateWithHash";
import { UserPayload } from "models/auth";

const MyProfileViews = () => {
  const { data, loading } = useGetApi(getProfileViewed);

  const viewersList: UserPayload[] = data?.data;
  const { sendUserToNextPage } = useNavigateWithHash();

  return (
    <>
      <AccessLayout path={PATHS.NETWORK}>
        <FeedLayout>
          <Box>
            <div className="p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px] flex items-center gap-x-2">
              <h3 className="font-[500] text-[40px] ">
                {viewersList?.length || <CircularProgress size={15} />}
              </h3>
              <div>
                <h3 className="text-black font-[500] text-[20px]">
                  Who viewed my profile?
                </h3>
                <Typography sx={{ fontSize: "14px" }}>
                  People viewed your profile.{" "}
                </Typography>
              </div>
            </div>
            <div className=" mt-3 p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px] ">
              <Typography sx={{ mb: 2 }}>
                List of users who viewed your profile{" "}
              </Typography>

              {loading ? (
                <>
                  <UserListSkeleton variant="List" length={10} />
                </>
              ) : (
                <>
                  {viewersList?.map((user, index) => (
                    <div className="mt-3" key={index}>
                      <div className="flex items-center justify-between  pb-4">
                        <div className="flex items-center space-x-2">
                          <Avatar
                            onClick={() =>
                              sendUserToNextPage(
                                user?.user.email,
                                user?.user?.firstName
                              )
                            }
                            src={
                              user?.asset?.profilePictureUrl ||
                              images.defaultAvater
                            }
                            alt={user?.user.firstName}
                            className="w-10 h-10 rounded-full"
                          />

                          <div>
                            <div
                              className="flex items-centers space-x-1 cursor-pointer"
                              onClick={() =>
                                sendUserToNextPage(
                                  user?.user?.email,
                                  user?.user?.firstName
                                )
                              }
                            >
                              <h5 className="text-sm font-normal">{`${user?.user.firstName} ${user?.user.lastName}`}</h5>
                              {/* <HiCheckBadge className="text-blue-400" /> */}
                            </div>
                            <div>
                              <p className="text-xs text-octenary">
                                <FormatProfileType
                                  value={user?.user?.profileType || ""}
                                />{" "}
                                - {user?.user.sportType}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          {/* {user?.profileType === "TEAM" ? (
                        <Button
                          variant="outlined"
                          onClick={() => handleToggleFollow(user.email, index.toString())}
                          disabled={connectionLoader === index.toString()}
                          sx={{
                            width: "110px",
                            fontSize: "12px",
                            height: "37px",
                          }}
                        >
                          {user.following === true ? "Unfollow" : "Follow"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleConnect(user.email, index.toString())}
                          disabled={
                            connectionLoader === index.toString() || user.status === "PENDING"
                          }
                          startIcon={
                            user.status === "PENDING" ? (
                              <MdAccessTime style={{ fontSize: "14px" }} />
                            ) : (
                              <BsPeopleFill style={{ fontSize: "14px" }} />
                            )
                          }
                          className="border border-primary text-primary text-xs py-1 px-4 rounded-2xl"
                          sx={{
                            width: "110px",
                            bgcolor: "primary.main",
                            color: "#fff",
                            px: 2,
                            fontSize: "12px",
                            height: "37px",
                            boxShadow: "none",
                          }}
                        >
                          {connectionLoader === index.toString() ? (
                            <LinearProgress sx={{ width: "40px", height: "2px" }} />
                          ) : user.status === "PENDING" ? (
                            "Pending"
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      )} */}
                        </div>
                      </div>
                      {index !== viewersList?.length - 1 && (
                        <div className="h-[0.5px] bg-[#F1F1F1] mb-3"></div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </Box>
        </FeedLayout>
      </AccessLayout>
    </>
  );
};

export default MyProfileViews;
