import {
  Avatar,
  Box,
  Button,
  Divider,
  MenuItem,
  Typography,
} from "@mui/material";
import { getNotifications } from "api";
import AccessLayout from "layouts/AccessLayout";
import FeedLayout from "layouts/FeedLayout";
import useAuthDetails from "pages/auth/useAuthDetails";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import React, { useEffect, useState } from "react";
import { PATHS } from "Routes/routes.path";

type UserProfile = {
  id: number;
  username: string;
  pictureUrl: string;
  profileType: "TEAM" | "INDIVIDUAL";
  performerEmail: string;
};

type Notification = {
  message: string;
  topic: "like" | "comment" | "share" | string;
  receiver: string;
  data: UserProfile[];
};

const Notification = () => {
  const [notification_list, setNotificationList] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCatregory] = useState("All");

  const { email } = useAuthDetails();

  const handleGetNotifications = async () => {
    setLoading(true);
    await getNotifications(email ?? "")
      .then((res) => {
        console.log(res);
        setNotificationList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetNotifications();
  }, [email]);

  const { sendUserToNextPage } = useNavigateWithHash();
  return (
    <>
      <AccessLayout path={PATHS.NOTIFICATIONS}>
        <FeedLayout>
          <Box>
            <div className="p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px] flex items-center gap-x-2">
              {categories?.map((category, index) => (
                <MenuItem
                  onClick={() => setSelectedCatregory(category)}
                  key={index}
                  selected={selectedCategory === category}
                  sx={{
                    fontSize: "16px",
                    borderRadius: "50px",
                    fontWeight: 500,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "#fff",
                    },
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </div>
            <div className="p-6 rounded-2xl bg-white border-[#dfdeda] border-[0.5px] mt-3 min-h-[80vh]">
              {!notification_list || notification_list.length === 0 ? (
                <></>
              ) : (
                <>
                  {notification_list?.map((notification, index) => (
                    <>
                      <MenuItem
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          columnGap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            columnGap: 2,
                            alignItems: "center",
                          }}
                        >
                          <Avatar
                            onClick={() =>
                              sendUserToNextPage(
                                notification.data[0].performerEmail,
                                notification.data[0].username
                              )
                            }
                            src={notification?.data[0]?.pictureUrl}
                            sx={{ width: "45px", height: "45px" }}
                          />
                          <Box>
                            <Typography>{notification.message}</Typography>
                            {notification.topic === "connect" && (
                              <Box sx={{ mt: 1 }}>
                                <Button
                                  variant="contained"
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                  }}
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="outlined"
                                  sx={{
                                    borderRadius: "50px",
                                    fontSize: "12px",
                                    ml: 3,
                                    color: "#8D95A0",
                                    borderColor: "#8D95A0",
                                  }}
                                >
                                  Decline
                                </Button>
                              </Box>
                            )}
                          </Box>
                        </Box>

                        <Typography>1h</Typography>
                      </MenuItem>
                      <Divider sx={{ my: 3 }} />
                    </>
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

export default Notification;

const categories = ["All", "My Post"];
