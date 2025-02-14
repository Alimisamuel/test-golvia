import { PATHS } from "Routes/routes.path";
import { ReactComponent as ProfileIcon } from "assets/icons/user-square.svg";
import { ReactComponent as PasswordIcon } from "assets/icons/lock.svg";
// import { ReactComponent as NotificationIcon } from "assets/icons/notification.svg";
import { IoHelpCircleOutline } from "react-icons/io5";
// import { ReactComponent as ActivityIcon } from "assets/icons/activity.svg";
import { ReactComponent as ChevronRightIcon } from "assets/icons/chevron-right.svg";
import { ReactComponent as BackIcon } from "assets/icons/arrow-left.svg";
import { Drawer, Stack, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdJoinRight } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";
import { GoShieldLock } from "react-icons/go";

export const settingsNavItems = {
  [PATHS.SETTINGS.PROFILE]: {
    label: "Profile",
   icon: RxAvatar,
  },
  [PATHS.SETTINGS.PASSWORD_RESET]: {
    label: "Sign in & Security",
    icon: GoShieldLock,
  },
  [PATHS.SETTINGS.MY_REFERRALS]: {
    label: "My Referrals",
    icon: MdJoinRight,
  },
  [PATHS.SETTINGS.FAQ]: {
    label: "Faqs",
    icon: IoHelpCircleOutline,
  },
  // [PATHS.SETTINGS.ACTIVITIES]: {
  //   label: "Activity Log",
  //   icon: ActivityIcon,
  // },
  // [PATHS.SETTINGS.ACTIVITIES]: {
  //   label: "Activity Log",
  //   icon: ActivityIcon,
  // },
};

export default function SettingsHeader() {
  const [isOpen, setOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(PATHS.SETTINGS.PROFILE);
  const { pathname } = useLocation();

  const toggleDrawer = () => setOpen((prevState) => !prevState);
  useEffect(() => {
    setActiveNav(pathname);
  }, []);

  return (
    <>
      <Stack direction="row" alignItems="center">
        {!isOpen && <BackIcon onClick={toggleDrawer} />}
        <Typography
          variant="p$18"
          fontWeight="medium"
          position="absolute"
          left="50%"
          className="translate-x-[-50%]"
        >
          {isOpen ? "Settings" : settingsNavItems[activeNav]?.label || "Default Label"}
        </Typography>
      </Stack>

      <Drawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer}
        className="*:!top-16"
        ModalProps={{}}
        PaperProps={{
          style: { padding: 16, paddingTop: 8 },
          className: "w-screen !bg-quaternary !shadow-none",
        }}
      >
        <Stack component="ul" role="list" paddingY={1} className="">
          {Object.entries(settingsNavItems).map(([key, { label, icon: Icon }]) => (
            <Stack
              key={label}
              direction="row"
              justifyContent="space-between"
              paddingLeft={4}
              paddingRight={3}
              alignItems="center"
              component={Link}
              to={key}
              onClick={toggleDrawer}
              width="100%"
              height={56}
              spacing={3}
              marginBottom={2}
              className="bg-white rounded-lg"
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Icon width="22px" height="22px" />
                <Typography
                  variant="p$18"
                  fontWeight="medium"
                  className="min-w-0 flex-auto text-inherit"
                >
                  {label}
                </Typography>
              </Stack>
              <ChevronRightIcon width="14px" height="14px" />
            </Stack>
          ))}
        </Stack>
      </Drawer>
    </>
  );
}
