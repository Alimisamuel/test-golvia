import React, { useEffect, useState } from "react";
import { ReactComponent as ChevronRightIcon } from "../assets/icons/chevron-right.svg";
import { Box, Stack, Typography } from "@mui/material";
import AccessLayout from "./AccessLayout";
import { PATHS } from "Routes/path";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { clsx } from "clsx";
import { settingsNavItems } from "components/headers/SettingsHeader";
import { HeaderHeight } from "constants/layers";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout = (props: Props) => {
  const { children } = props;
  const [activeNav, setActiveNav] = useState(PATHS.SETTINGS.PROFILE);
  const { pathname } = useLocation();
  const mobileMaxHeight = `calc(100vh - ${HeaderHeight.mobile}*2)`;
  const desktopMaxHeight = `calc(100vh - ${HeaderHeight.desktop})`;

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  useEffect(() => {
    setActiveNav(pathname);
  }, []);

  return (
    <AccessLayout path={PATHS.SETTINGS.PROFILE}>
      <Helmet>
        <title>Settings | Golvia</title>
      </Helmet>
      <div className="flex *:py-8   space-x-0 md:space-x-8 bg-[#f4f2ee] xs:mx-[-10px]">
        {/* Left side */}
        <div className=" h-full hidden md:block">
          <Stack
            component="ul"
            role="list"
            paddingY={1}
            className="divide-y divide-gray-200 bg-white rounded-2xl"
            sx={{ border: "0.5px solid #dfdeda " }}
          >
            {Object.entries(settingsNavItems).map(
              ([key, { label, icon: Icon }]) => (
                <Stack
                  key={label}
                  direction="row"
                  justifyContent="space-between"
                  paddingLeft={4}
                  paddingRight={3}
                  alignItems="center"
                  component={Link}
                  to={key}
                  width="100%"
                  height={56}
                  spacing={3}
                  className={clsx(activeNav == key && "text-gv-blue_1D69D8")}
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Icon style={{ fontSize: "20px" }} />
                    <Typography
                      variant="p$18"
                      fontWeight="medium"
                      className="min-w-0 flex-auto text-inherit whitespace-nowrap"
                    >
                      {label}
                    </Typography>
                  </Stack>
                  <ChevronRightIcon
                    width="14px"
                    height="14px"
                    className={clsx(activeNav == key && "text-gv-blue_1D69D8")}
                  />
                </Stack>
              )
            )}
          </Stack>
        </div>
        {/* Right Side */}
        <Box
          maxHeight={{ xs: mobileMaxHeight, md: desktopMaxHeight }}
          className=" relative overflow-y-auto scrollbar-none"
          sx={{ width: "100%" }}
        >
          <Box
            className="rounded-2xl bg-white"
            style={{ border: "0.5px solid #dfdeda " }}
          >
            {children}
          </Box>
        </Box>
      </div>
    </AccessLayout>
  );
};

export default SettingsLayout;
