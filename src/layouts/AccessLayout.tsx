import React from "react";
import Header, { BottomNavigations } from "../components/headers/Header";
import SettingsHeader from "components/headers/SettingsHeader";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import ProfileSetupHeader from "components/headers/ProfileSetupHeader";
import { HeaderHeight, Layout } from "constants/layers";

interface AccessLayoutProps {
  children: React.ReactNode;
  path: string;
}

const AccessLayout = ({ path, children }: AccessLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const renderHeader = () => {
    if (path.match("settings")) {
      return <SettingsHeader />;
    }

    if (path.match("get-started")) {
      return <ProfileSetupHeader />;
    }

    return <Header path={path} />;
  };

  return (
    <div className=" relative w-full bg-[#f4f2ee] hide_scrollbar *:xs:px-4 *:sm:px-6 *:md:px-8 *:lg:px-0 ">
      <Stack
        justifyContent="center"
        width="100%"
        position="fixed"
        top="0"
        height={{ xs: HeaderHeight.mobile, md: HeaderHeight.desktop }}
        zIndex="50"
        className="bg-white"
        sx={{ borderBottom: "0.5px solid #dfdeda " }}
      >
        {isMobile ? (
          <>
            {renderHeader()}
            <BottomNavigations />
          </>
        ) : (
          <Header path={path} />
        )}
      </Stack>

      <Box
        maxWidth={Layout.maxWidth}
        ml="auto"
        mr="auto"
        paddingTop={{ xs: HeaderHeight.mobile, md: HeaderHeight.desktop }}
        paddingBottom={{ xs: 6, md: 3 }}
        minHeight="100vh"
      >
        {children}
      </Box>
    </div>
  );
};

export default AccessLayout;
