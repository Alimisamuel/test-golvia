import Logo from "../../assets/logo/logo-white.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiHome3Fill, RiArrowDownSLine } from "react-icons/ri";
import {
  Avatar,
  useMediaQuery,
  useTheme,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Stack,
  Typography,
  Button,
  Box,
  Divider,
  MenuItem,
  Popover,
  Badge,
} from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import Avatar1 from "../../assets/dummy_avatar_img/avatar_img.svg";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";
import { PATHS } from "../../Routes/path";
import useAuthDetails from "pages/auth/useAuthDetails";
import { Layout } from "constants/layers";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { logOut, selectToken } from "api/slice/auth";
import Search from "./Search";
import { IoMdFootball } from "react-icons/io";
import { ReactComponent as BlogIcon } from "assets/icons/blog.svg";
import { ReactComponent as LeaderboardIcon } from "assets/icons/leaderboard.svg";
import clsx from "clsx";
import useNotificationSocketListener from "utils/WebSocket/useNotificationSocket";

interface HeaderProps {
  path: string;
}

const Header = ({ path }: HeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { firstName, asset } = useAuthDetails();
  const location = useLocation();
  // POPPER
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logOut());
    navigate(PATHS.LOGIN, { state: { redirectTo: location.pathname } });
  };

  const { email } = useAuthDetails();

  // const baseUrl = process.env.REACT_APP_BASE_URL;

  //   const { notifications} = useNotificationSocketListener(email || "")

  const token = useAppSelector(selectToken);
  const isAuthenticated = token || window.localStorage.getItem("authToken");

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="-webkit-fill-available"
        maxWidth={Layout.maxWidth}
        mr="auto"
        ml="auto"
      >
        {isAuthenticated ? (
          <>
            <div className="flex items-center">
              <Link to={PATHS.FEED} className="mr-4">
                <img src={Logo} alt="logo" />
              </Link>
              <Search />
            </div>
            {!isMobile && (
              <Stack
                direction="row"
                paddingY={1 / 2}
                paddingX={1.5}
                alignItems="center"
                borderRadius={30}
                spacing={4}
                width="fit-content"
                display={{ xs: "none", md: "flex" }}
                className="lg:-ml-30 bg-quaternary"
              >
                {NAVROUTES.map(({ Icon, pathname, name }) => (
                  <Link
                    key={pathname}
                    to={pathname}
                    className={`flex items-center text-sm text-senary space-x-1 ${
                      pathname === path &&
                      "bg-primary rounded-3xl text-white py-1 px-2"
                    } `}
                  >
                    <Icon className="text-base" />
                    <Typography variant="p$14">{name}</Typography>
                  </Link>
                ))}
              </Stack>
            )}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
            >
              {/* <Link to={PATHS.NOTIFICATIONS}>
          <Badge
        variant="dot"
            color="primary"
            sx={{
              fontSize: "7px",
              cursor:'pointer',
              ".MuiBadge-colorPrimary": {
                bgcolor: "#FF5F3E",
              },
            }}
          >
            <FaBell style={{ fontSize: "20px" }} />
          </Badge>
          </Link> */}
              {/* {!isMobile && (
            <Link
              key={PATHS.CHALLENGE.LEADERBOARD}
              to={PATHS.CHALLENGE.LEADERBOARD}
              className={`flex items-center text-sm text-senary space-x-1  py-1 px-2 rounded-3xl bg-quaternary ${
                PATHS.CHALLENGE.LEADERBOARD === path && "!bg-primary text-white"
              }`}
            >
              <LeaderboardIcon />
              <Typography variant="p$14">Leaderboard</Typography>
            </Link>
          )} */}
              <Button
                sx={{ width: "fit-content", p: 0 }}
                type="button"
                aria-describedby={id}
                onClick={handleClick}
              >
                <Stack
                  direction="row"
                  paddingY={1 / 2}
                  paddingX={1 / 2}
                  maxWidth={130}
                  alignItems="center"
                  borderRadius={30}
                  spacing={1}
                  flexShrink={4}
                  className="bg-quaternary"
                >
                  <Avatar
                    src={
                      asset?.profilePictureUrl
                        ? asset?.profilePictureUrl
                        : Avatar1
                    }
                    alt="avatar"
                    sx={{ width: 28, height: 28 }}
                  />
                  {!isMobile && (
                    <Typography noWrap sx={{ fontSize: "12px" }}>
                      {firstName}
                    </Typography>
                  )}
                  <RiArrowDownSLine />
                </Stack>
              </Button>
            </Stack>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <Link to={PATHS.FEED} className="mr-4">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            {!isMobile && (
              <Stack
                direction="row"
                paddingY={1 / 2}
                paddingX={1.5}
                alignItems="center"
                borderRadius={30}
                spacing={4}
                width="fit-content"
                display={{ xs: "none", md: "flex" }}
                className="lg:-ml-30 bg-quaternary"
              >
                {NAVROUTES.map(({ Icon, pathname, name }) => (
                  <Link
                    key={pathname}
                    to={pathname}
                    className={`flex items-center text-sm text-senary space-x-1 ${
                      pathname === path &&
                      "bg-primary rounded-3xl text-white py-1 px-2"
                    } `}
                  >
                    <Icon className="text-base" />
                    <Typography variant="p$14">{name}</Typography>
                  </Link>
                ))}
              </Stack>
            )}
            <Stack
              direction="row"
              spacing={2}
              sx={{ display: "flex", alignItems: "center", columnGap: 2 }}
            >
              <Link to={PATHS.LOGIN} state={{ redirectTo: location.pathname }}>
                <Button
                  variant="outlined"
                  sx={{
                    height: { md: "45px", xs: "40px" },
                    borderRadius: { md: "10px", xs: "8px" },
                    width: "95px",
                    borderWidth: "1.5px",
                    borderColor: "primary.main",
                    fontSize: { md: "16px", xs: "14px" },
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to={PATHS.SIGNUP}>
                <Button
                  variant="contained"
                  sx={{
                    height: { md: "45px", xs: "40px" },
                    borderRadius: { md: "10px", xs: "8px" },
                    px: 2,

                    fontSize: { md: "16px", xs: "14px" },
                  }}
                >
                  Create Account
                </Button>
              </Link>
            </Stack>
          </>
        )}
      </Stack>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box
          sx={{
            bgcolor: "#fff",
            border: "1px solid #EAF1FD",
            borderRadius: "8px",
            width: "200px",
          }}
        >
          {/* <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
                <Avatar
                  src={asset?.profilePictureUrl ? asset?.profilePictureUrl : Avatar1}
                  alt="avatar"
                  sx={{ width: 28, height: 28 }}
                />
                <Box>
                  <InputLabel sx={{ fontWeight: 700, fontSize: "12px" }}>
                    {" "}
                    {`${firstName} ${lastName}`}
                  </InputLabel>

                  <Typography sx={{ fontSize: "10px" }}>{profileType}</Typography>
                </Box>
              </Box>  */}
          <Link to={PATHS.SETTINGS.PROFILE}>
            <MenuItem sx={{ fontSize: "16px", py: 1.5 }}>Profile</MenuItem>
          </Link>
          <Divider sx={{}} />
          <Link to={PATHS.SETTINGS.PROFILE}>
            <MenuItem sx={{ fontSize: "16px", py: 1.5 }}>Settings</MenuItem>
          </Link>
          <Divider sx={{}} />
          <Divider sx={{}} />
          {/* <Link to={PATHS.CHALLENGE.LEADERBOARD}>
            <MenuItem sx={{ fontSize: "16px", py: 1.5 }}>Leaderboard</MenuItem>
          </Link> */}
          <Divider sx={{}} />

          <MenuItem
            onClick={handleLogout}
            sx={{
              fontSize: "16px",
              py: 1.5,
              "&:hover": { textDecoration: "underline" },
            }}
          >
            {" "}
            Logout
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
};

export default Header;

const NAVROUTES = [
  {
    pathname: PATHS.FEED,
    name: "Home",
    Icon: RiHome3Fill,
  },
  {
    pathname: PATHS.NETWORK,
    name: "Network",
    Icon: MdPeopleAlt,
  },
  // {
  //   pathname: PATHS.MESSAGES,
  //   name: "Message",
  //   Icon: TbMessageFilled,
  // },
  // {
  //   pathname: PATHS.MARKETPLACE,
  //   name: "Marketplace",
  //   Icon: HiShoppingCart,
  // },

  {
    pathname: PATHS.LIVESCORE,
    name: "Livescore",
    Icon: IoMdFootball,
  },
  {
    pathname: PATHS.BLOG,
    name: "Sportssphere",
    Icon: BlogIcon,
  },
];

export const BottomNavigations = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("Home");

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);

    switch (newValue) {
      case "Home":
        navigate(PATHS.FEED);
        break;
      case "Network":
        navigate(PATHS.NETWORK);
        break;
      case "Message":
        navigate(PATHS.MESSAGES);
        break;
      case "Marketplace":
        navigate(PATHS.MARKETPLACE);
        break;
      case "Sportssphere":
        navigate(PATHS.BLOG);
        break;
      default:
        navigate(PATHS.LIVESCORE);
        break;
    }
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {NAVROUTES.map(({ Icon, name }) => (
          <BottomNavigationAction
            label={name}
            value={name}
            icon={<Icon />}
            key={name}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};
