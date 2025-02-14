import React, { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import {
  Avatar,
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Popover,
  Stack,
  TextField,
  Typography,
  useTheme,
  Modal,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { IoEllipsisVertical } from "react-icons/io5";
import useAuthDetails from "pages/auth/useAuthDetails";
import { useGetApi } from "api/hooks/useGetApi";
import { getPendingUsers, getPersonalNetwork, removeNetwork } from "api";
import { MdOutlineClose } from "react-icons/md";
import useAlert from "components/alert/useAlert";
import useNavigateWithHash from "pages/settings/profile/hooks/useNavigateWithHash";
import FormatProfileType from "pages/settings/profile/Utils/FormatProfileType";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: "12px",
};

interface NetworkData {
  email: string;
  firstName: string;
  lastName: string;
}

type NavViewType =
  | "All"
  | "Athletes"
  | "Scout"
  | "Club/Organization"
  | "Pending"
  | "Followers"
  | "Following";

export default function PersonalNetwork() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkData>();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const { data: myNetworks, refetch } = useGetApi(getPersonalNetwork);
  const { data: pendingNetwork } = useGetApi(getPendingUsers);

  const [filteredContent, setFilteredContent] = React.useState(myNetworks?.data);

  useEffect(() => {
    setFilteredContent(myNetworks?.data);
  }, [myNetworks]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: NetworkData) => {
    setAnchorEl(event.currentTarget);
    setSelectedNetwork(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { profileType } = useAuthDetails();
  const [navView, setNavView] = React.useState<NavViewType>(
    profileType === "TEAM" ? "Followers" : "All"
  );

  // Filter content based on the selected navView
  useEffect(() => {
    switch (navView) {
      case "All":
        setFilteredContent(myNetworks?.data);
        break;

      case "Athletes":
        setFilteredContent(myNetworks?.data?.filter((item) => item.profileType === "ATHLETES"));
        break;

      case "Scout":
        setFilteredContent(myNetworks?.data?.filter((item) => item.profileType === "SCOUT"));
        break;

      case "Club/Organization":
        setFilteredContent(myNetworks?.data?.filter((item) => item.profileType === "TEAM"));
        break;
      case "Pending":
        setFilteredContent(pendingNetwork?.data);
        break;

      default:
        setFilteredContent(myNetworks?.data);
    }
  }, [navView, myNetworks]);

  // Function to get the count of items for each NavView
  const getViewCount = (view: NavViewType): number | undefined => {
    if (!myNetworks?.data) return 0; // Handle undefined `filteredContent`

    switch (view) {
      case "All":
        return myNetworks?.data.length;

      case "Athletes":
        return myNetworks?.data.filter((item) => item.profileType === "ATHLETES").length;

      case "Scout":
        return myNetworks?.data.filter((item) => item.profileType === "SCOUT").length;

      case "Club/Organization":
        return myNetworks?.data.filter((item) => item.profileType === "TEAM").length;

      default:
        return 0;
    }
  };

  const [searchParams, setSearchParams] = React.useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setSearchParams(value);

    const filteredUsers = myNetworks?.data.filter(
      (item) =>
        item?.firstName?.toLowerCase().includes(value.toLowerCase()) ||
        item?.lastName?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredContent(filteredUsers || []);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleAlert = useAlert();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleRemoveNetwork = async () => {
    setIsLoading(true);

    await removeNetwork(selectedNetwork?.email || "")
      .then((res) => {
        refetch();
        console.log(res);
        handleCloseModal();
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { sendUserToNextPage } = useNavigateWithHash();
  return (
    <>
      <Stack
        direction="row"
        spacing={4}
        marginBottom={{ lg: 3 }}
        paddingX={4}
        borderRadius="16px"
        overflow="auto"
        className="bg-white"
      >
        {profileType === "TEAM" ? (
          <>
            {NavViewsTeam.map((view) => (
              <Stack
                key={view?.id}
                direction="row"
                alignItems="center"
                paddingY={{ xs: 1, md: 2.5 }}
                spacing={{ xs: 1, md: 1.5 }}
                onClick={() => {
                  setNavView(view?.name);
                  setSearchParams("");
                }}
                className="cursor-pointer"
              >
                <Typography
                  variant="p$14"
                  color={navView === view.name ? "primary" : "text"}
                  fontWeight={navView === view.name ? "600" : "medium"}
                >
                  {view?.name}
                </Typography>
                <Typography
                  fontWeight="medium"
                  borderRadius="8px"
                  component="span"
                  paddingX={1}
                  className={`${
                    navView === view.name
                      ? " bg-primary text-white"
                      : " bg-[#F3F6FC] text-[#AAB1C0]"
                  } !text-[12px]`}
                >
                  {getViewCount(view.name)}
                </Typography>
              </Stack>
            ))}
          </>
        ) : (
          <>
            {NavViews.map((view) => (
              <Stack
                key={view?.id}
                direction="row"
                alignItems="center"
                paddingY={{ xs: 1, md: 2.5 }}
                spacing={{ xs: 1, md: 1.5 }}
                onClick={() => {
                  setNavView(view?.name);
                  setSearchParams("");
                }}
                className="cursor-pointer"
              >
                <Typography
                  variant="p$14"
                  color={navView === view.name ? "primary" : "text"}
                  fontWeight={navView === view.name ? "600" : "medium"}
                >
                  {view?.name}
                </Typography>
                <Typography
                  fontWeight="medium"
                  borderRadius="8px"
                  component="span"
                  paddingX={1}
                  className={`${
                    navView === view.name
                      ? " bg-primary text-white"
                      : " bg-[#F3F6FC] text-[#AAB1C0]"
                  } !text-[12px]`}
                >
                  {getViewCount(view.name)}
                </Typography>
              </Stack>
            ))}
          </>
        )}
        <Stack
          direction="row"
          alignItems="center"
          paddingY={{ xs: 1, md: 2.5 }}
          spacing={{ xs: 1, md: 1.5 }}
          onClick={() => {
            setNavView("Pending");
            setSearchParams("");
          }}
          className="cursor-pointer"
        >
          <Typography
            variant="p$14"
            color={navView === "Pending" ? "primary" : "text"}
            fontWeight={navView === "Pending" ? "600" : "medium"}
          >
            Pending
          </Typography>
          <Typography
            fontWeight="medium"
            borderRadius="8px"
            component="span"
            paddingX={1}
            className={`${
              navView === "Pending" ? " bg-primary text-white" : " bg-[#F3F6FC] text-[#AAB1C0]"
            } !text-[12px]`}
          >
            {pendingNetwork?.data?.length}
          </Typography>
        </Stack>
      </Stack>
      <Box
        paddingY={{ xs: 2, lg: 4 }}
        paddingX={{ xs: 2, md: 4 }}
        borderRadius="16px"
        width="100%"
        className="bg-white"
      >
        {/* {(filteredContent?.length ?? 0 ) > 0 || ( searchParams.length > 0) && ( */}
        <TextField
          placeholder="Search athletes, scout, fanbase or teams"
          fullWidth
          value={searchParams}
          onChange={handleSearch}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 1.5 }}>
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                fontSize: "12px",
              },
            },
          }}
          sx={{
            marginBottom: { xs: 2, md: 5 },
            "& fieldset": {
              borderColor: theme.palette.primary.light,
              boxShadow: `1px 1px 2px ${theme.palette.primary.light}`,
            },
            "&:hover fieldset.MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }}
        />
        {/* )} */}

        <Stack spacing={{ xs: 2, md: 3 }} divider={<hr className="border-[#F1F1F1]" />}>
          {(filteredContent?.length ?? 0) > 0 ? (
            filteredContent?.map((item, idx) => (
              <Stack key={idx} direction="row" justifyContent="space-between">
                <Stack direction="row" spacing={{ xs: 1, md: 3 }} alignItems="center">
                  <Avatar
                    onClick={() => sendUserToNextPage(item?.email, item?.firstName)}
                    src={item?.profilePictureUrl}
                    alt="avatar"
                    sx={{
                      width: { xs: 40, md: 50 },
                      height: { xs: 40, md: 50 },
                    }}
                  />

                  <div>
                    <p
                      onClick={() => sendUserToNextPage(item?.email, item?.firstName)}
                      className="text-base cursor-pointer"
                    >
                      {item?.firstName} {item?.lastName}
                    </p>

                    <p className="text-[#8D95A0] text-xs">
                      <FormatProfileType value={item?.profileType} />- {item?.sportType}
                    </p>
                  </div>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={{ xs: 1, md: 1.5 }}>
                  {/* <Button variant="outlined" sx={{ fontWeight: 400, fontSize:'12px' }}>
                    <IoPersonRemoveOutline className="mr-2 text-[12px]"  />
                   Remove from my network
                  </Button> */}
                  <button
                    onClick={(e) => {
                      handleClick(e, item);
                    }}
                  >
                    <IoEllipsisVertical className="text-lg text-[#6A7280]" />
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    sx={{
                      width: 220,
                      mt: 2,
                      border: 0,
                      borderRadius: 1,
                      boxShadow: "none",
                      "& .MuiPopover-paper": {
                        width: 220,
                        // bgcolor: "#EAF1FD",
                        color: "#1D69D8",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        boxShadow: "none",
                      },
                    }}
                  >
                    <MenuItem onClick={handleOpenModal} sx={{ fontSize: "12px" }}>
                      Remove from my network
                    </MenuItem>
                  </Popover>
                </Stack>
              </Stack>
            ))
          ) : (
            <div className="w-full flex justify-center mt-2 text-primary font-medium">
              <p>No {navView} found</p>
            </div>
          )}
        </Stack>
        {(filteredContent?.length ?? 0) > 0 && (
          <Stack
            justifyItems="center"
            alignItems="center"
            marginTop={4}
            position="relative"
            spacing={4}
          >
            {/* <hr className="absolute w-screen -ml-12 border-[#F1F1F1]" /> */}
            {/* <Typography variant="p$16" color="primary" fontWeight="medium">
              Show more results
            </Typography> */}
          </Stack>
        )}
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 3,
              pt: 2,
            }}
          >
            <Typography sx={{ fontWeight: 600 }}>Remove Connection</Typography>
            <IconButton onClick={handleCloseModal}>
              <MdOutlineClose />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            Are you sure you want to disconnect from{" "}
            <b>{`${selectedNetwork?.firstName} ${selectedNetwork?.lastName}`}</b>? Rest assured,{" "}
            {`${selectedNetwork?.firstName}`} will not be notified about this action.
          </Box>
          <Divider />
          <Box
            sx={{
              px: 3,
              py: 2,
              display: "flex",
              justifyContent: "right",
              columnGap: 2,
            }}
          >
            <Button
              onClick={handleCloseModal}
              sx={{ borderRadius: "50px", width: "100px" }}
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={10} />}
              onClick={handleRemoveNetwork}
              sx={{ borderRadius: "50px", width: "100px" }}
              variant="contained"
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

const NavViews: { id: number; name: NavViewType }[] = [
  {
    id: 1,
    name: "All",
  },
  {
    id: 2,
    name: "Athletes",
  },
  {
    id: 3,
    name: "Scout",
  },
  {
    id: 4,
    name: "Club/Organization",
  },
];
const NavViewsTeam: { id: number; name: NavViewType }[] = [
  {
    id: 1,
    name: "Followers",
  },
  {
    id: 2,
    name: "Following",
  },
];
