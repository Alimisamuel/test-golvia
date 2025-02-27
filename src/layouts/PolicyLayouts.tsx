import Header from "components/headers/Header";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "Routes/path";
import {
  Box,
  Divider,
  ListItemButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GoChevronRight } from "react-icons/go";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Cookies, Privacy, Terms } from "pages/policy";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const PolicyLayouts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="relative w-full  bg-quaternary hide_scrollbar">
        <Stack
          justifyContent="center"
          width="100%"
          position="fixed"
          top="0"
          height={{ xs: "60px", md: "80px" }}
          zIndex="50"
          paddingX={{ xs: 3, md: 4 }}
          className="bg-white"
        >
          <Header path={PATHS.SETTINGS.PROFILE} />
        </Stack>
      </div>
      <Divider sx={{ mt: 10 }} />

      {isMobile ? (
        <Box sx={{ width: "100%", px: 2, mt: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Privacy Policy" {...a11yProps(0)} />
              <Tab label="Terms of Use" {...a11yProps(1)} />
              <Tab label="Cookie Policy" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Privacy />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Terms />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Cookies />
          </CustomTabPanel>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: { xl: "75%", lg: "85%", md: "85%", margin: "0 auto" },
            mt: 4,
            columnGap: 6,
            pb: 10,
          }}
        >
          <Box
            sx={{
              bgcolor: "blueMinus5",
              p: 2,
              width: "20%",
              borderRadius: "12px",
              height: "fit-content",
              display: { lg: "block", md: "block", sm: "none", xs: "none" },
            }}
          >
            {navData.map((list, index) => {
              const isMatch = location.pathname === list.path;
              return (
                <ListItemButton
                  key={index}
                  onClick={() => navigate(list.path)}
                  selected={isMatch}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                    },
                    "&:hover": {
                      color: "#000",
                    },
                    borderRadius: "8px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      columnGap: 2,
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        color: isMatch ? "#fff" : "#000",
                      }}
                    >
                      {list.name}
                    </Typography>
                    <GoChevronRight
                      style={{ color: isMatch ? "#fff" : "#000" }}
                    />
                  </Box>
                </ListItemButton>
              );
            })}
          </Box>
          <Box sx={{ width: { lg: "80%", md: "80%", sm: "95%", xs: "95%" } }}>
            <Outlet />
          </Box>
        </Box>
      )}
    </>
  );
};

export default PolicyLayouts;

const navData = [
  {
    name: "Privacy Policy",
    path: PATHS.PRIVACY_POLICY,
  },
  {
    name: "Terms of Use",
    path: PATHS.TERMS_OF_USE,
  },
  {
    name: "Cookie Policy",
    path: PATHS.COOKIE_POLICY,
  },
];
