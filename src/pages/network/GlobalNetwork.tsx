import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Skeleton,
  TextField,
} from "@mui/material";
import successTone from "../../assets/tone/success-tone.mp3";
import { BsPeopleFill } from "react-icons/bs";
import { RiSearch2Line } from "react-icons/ri";
import { useGetApi } from "api/hooks/useGetApi";
import { getRecievedConnectedUsers, getUnConnectedUsers } from "api";
import images from "constants/images";
import { useCreateConnect } from "./hooks/useCreateConnect";
import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { useToggleFollowUser } from "./hooks/useFollow";
import { useAcceptConnection } from "./hooks/useAcceptConnection";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import FormatProfileType from "pages/settings/profile/Utils/FormatProfileType";

export default function GlobalNetwork() {
  const playSuccessTone = () => {
    const audio = new Audio(successTone); // Replace with the path to your audio file
    audio.play();
  };

  const { sendUserToNextPage } = useNavigateWithHash();
  const { createConnectionHandler, loadingButtonId: connectionLoader } = useCreateConnect();

  const { acceptConnectionHandler, loadingButtonId } = useAcceptConnection();

  const { createToggleFollowHandler } = useToggleFollowUser();

  const handleToggleFollow = async (email: string, id: string) => {
    await createToggleFollowHandler(email, id);

    setUpdatedUnconnectedUser((prevUsers) =>
      prevUsers?.map((user) => (user.email === email ? { ...user, following: true } : user))
    );
    playSuccessTone();
  };

  const handleConnect = async (email: string, id: string) => {
    await createConnectionHandler(email, id);

    // Update user's status to "PENDING" on success
    setUpdatedUnconnectedUser((prevUsers) =>
      prevUsers?.map((user) => (user.email === email ? { ...user, status: "PENDING" } : user))
    );
    playSuccessTone();
  };
  const handleAccept = async (email: string, id: string) => {
    await acceptConnectionHandler(email, id);

    // Update user's status to "PENDING" on success
    setAcceptedUser((prevUsers) =>
      prevUsers?.map((user) => (user.email === email ? { ...user, status: "PENDING" } : user))
    );
    playSuccessTone();
  };

  const { data: unconnectedUser, loading: unConnectedLoader } = useGetApi(getUnConnectedUsers);
  const { data: receivedconnectedUser, loading: recievedConnectedLoader } =
    useGetApi(getRecievedConnectedUsers);

  const [updatedUnconnectedUser, setUpdatedUnconnectedUser] = useState(unconnectedUser?.data);
  const [updatedAcceptedUser, setAcceptedUser] = useState(receivedconnectedUser?.data);

  useEffect(() => {
    setUpdatedUnconnectedUser(unconnectedUser?.data);
    setAcceptedUser(receivedconnectedUser?.data);
  }, [unconnectedUser, receivedconnectedUser]);

  const [searchParams, setSearchParams] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setSearchParams(value);

    const filteredUsers = unconnectedUser?.data.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(value.toLowerCase())
    );

    setUpdatedUnconnectedUser(filteredUsers || []);
  };

  return (
    <>
      {/* Top Clubs & Agents */}
      <div className="bg-white rounded-2xl px-4">
        {/* Top Clubs */}
        <div>
          <div className="py-4 ">
            <h3 className="text-black font-medium">Connection Requests</h3>
            <div className="mt-4 flex w-full overflow-scroll hide_scrollbar gap-x-4">
              {recievedConnectedLoader ? (
                <UserListSkeleton length={5} variant="Card" />
              ) : !updatedAcceptedUser || updatedAcceptedUser?.length === 0 ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <img src={images.emptyImg} alt="empty_connections" width={100} />

                  <p className="mt-4 text-gray-500">You have no connection requests</p>
                </div>
              ) : (
                updatedAcceptedUser?.map((user, index) => (
                  <Box key={user.email}>
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 2,
                        boxSizing: "border-box",
                        width: "180px",
                        border: "1px solid",
                        borderColor: "gray.border",
                        borderRadius: "10px",
                      }}
                    >
                      <Avatar
                        onClick={() => sendUserToNextPage(user?.email, user?.firstName)}
                        src={user.profilePictureUrl}
                        sx={{ width: "50px", height: "50px" }}
                      />

                      <div className="mt-2 w-full ">
                        <InputLabel
                          onClick={() => sendUserToNextPage(user?.email, user?.firstName)}
                          sx={{
                            maxWidth: "80%",
                            textAlign: "center",
                            margin: "0 auto",
                          }}
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </InputLabel>

                        <InputLabel
                          sx={{
                            maxWidth: "80%",
                            textAlign: "center",
                            margin: "0 auto",
                            fontSize: "12px",
                            color: "gray.light",
                          }}
                        >
                          <FormatProfileType value={user?.profileType || ""} /> - {user.sportType}
                        </InputLabel>
                      </div>
                      <Button
                        onClick={() => handleAccept(user.email, index.toString())}
                        startIcon={<BsPeopleFill style={{ fontSize: "14px" }} />}
                        disabled={loadingButtonId === index.toString()}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2, mx: 1 }}
                      >
                        {loadingButtonId === index.toString() ? (
                          <LinearProgress sx={{ width: "40px", height: "2px" }} />
                        ) : user.status === "PENDING" ? (
                          "Accepted"
                        ) : (
                          "Accept"
                        )}
                      </Button>
                    </Box>
                  </Box>
                ))
              )}
            </div>
          </div>

          <div className="py-4 ">
            <TextField
              fullWidth
              value={searchParams}
              onChange={handleSearch}
              placeholder="Search athletes, scout, fanbase or teams"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <RiSearch2Line />
                  </InputAdornment>
                ),
                style: {
                  fontSize: "12px",
                },
              }}
            />
          </div>
          <div className="py-4 ">
            <div className="flex justify-between items-center">
              <h3 className="text-black font-medium">You may be interested in:</h3>
              {/* <Link className="text-primary text-xs" to={"/feed"}>
                View all
              </Link> */}
            </div>
          </div>
          <div>
            {unConnectedLoader || !updatedUnconnectedUser ? (
              <UserListSkeleton length={9} variant="List" />
            ) : (
              updatedUnconnectedUser?.map((club, index) => (
                <div className="mt-3" key={index}>
                  <div className="flex items-center justify-between  pb-4">
                    <div className="flex items-center space-x-2">
                      <Avatar
                        onClick={() => sendUserToNextPage(club?.email, club?.firstName)}
                        src={club.profilePictureUrl || images.defaultAvater}
                        alt={club.firstName}
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <div
                          className="flex items-centers space-x-1 cursor-pointer"
                          onClick={() => sendUserToNextPage(club?.email, club?.firstName)}
                        >
                          <h5 className="text-sm font-normal">{`${club.firstName} ${club.lastName}`}</h5>
                          {/* <HiCheckBadge className="text-blue-400" /> */}
                        </div>
                        <div>
                          <p className="text-xs text-octenary">
                            <FormatProfileType value={club?.profileType || ""} /> - {club.sportType}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      {club?.profileType === "TEAM" ? (
                        <Button
                          variant="outlined"
                          onClick={() => handleToggleFollow(club.email, index.toString())}
                          disabled={connectionLoader === index.toString()}
                          sx={{
                            width: "110px",
                            fontSize: "12px",
                            height: "37px",
                          }}
                        >
                          {club.following === true ? "Unfollow" : "Follow"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleConnect(club.email, index.toString())}
                          disabled={
                            connectionLoader === index.toString() || club.status === "PENDING"
                          }
                          startIcon={
                            club.status === "PENDING" ? (
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
                          ) : club.status === "PENDING" ? (
                            "Pending"
                          ) : (
                            "Connect"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                  {index !== updatedUnconnectedUser?.length - 1 && (
                    <div className="h-[0.5px] bg-[#F1F1F1] mb-3"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Agents */}
      </div>
    </>
  );
}

interface NumberMapperProps {
  length: number;
  variant: "Card" | "List"; // Define the expected prop type
}

export const UserListSkeleton: React.FC<NumberMapperProps> = ({ length, variant }) => {
  const numbers = Array.from({ length }, (_, index) => index + 1);
  return (
    <>
      {variant === "List" &&
        numbers?.map((index) => (
          <div key={index}>
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                <Skeleton variant="circular" animation="wave" width={40} height={40} />
                <Box>
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={100}
                    sx={{ fontSize: "1rem", borderRadius: "0px" }}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width={80}
                    sx={{ fontSize: "0.6rem", borderRadius: "0px" }}
                  />
                </Box>
              </Box>
              <Box>
                <Skeleton animation="wave" width={70} height={50} />
              </Box>
            </Box>
            <div className="h-[0.5px] bg-[#F1F1F1] mb-3"></div>
          </div>
        ))}
      {variant === "Card" &&
        numbers?.map((index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
              boxSizing: "border-box",
              width: "180px",
              border: "0.5px solid",
              borderColor: "gray.border",
              borderRadius: "10px",
            }}
          >
            <Skeleton variant="circular" animation="wave" width={50} height={50} />

            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Skeleton
                variant="text"
                animation="wave"
                width={100}
                height={10}
                sx={{ borderRadius: "0px" }}
              />
              <Skeleton
                variant="text"
                animation="wave"
                width={80}
                sx={{ fontSize: "0.6rem", borderRadius: "0px" }}
              />
            </Box>

            <Box sx={{ mt: 2 }}>
              <Skeleton animation="wave" width={120} height={40} />
            </Box>
          </Box>
        ))}
    </>
  );
};

export const convertToTitleCase = (str: string): string => {
  if (!str) return str; // Handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
