import { useEffect, useState } from "react";
import AccessLayout from "../../layouts/AccessLayout";
import { PATHS } from "../../Routes/routes.path";
import { Helmet } from "react-helmet-async";
import FeedLayout from "../../layouts/FeedLayout";
import { Box, Button, Stack } from "@mui/material";
import PersonalNetwork from "./PersonalNetwork";
import GlobalNetwork from "./GlobalNetwork";
import { useLocation, useNavigate } from "react-router-dom";

function TabButton(props: { children: string; isactive: boolean; onClick: () => void }) {
  const { children, isactive } = props;

  return (
    <Button
      variant="contained"
      color={`${isactive ? "primary" : "gray"}`}
      sx={{
        height: 40,
        boxShadow: "none",
        width: { lg: "fit-content", xs: "100%" },
        ...(isactive
          ? { backgroundColor: "blueMinus2", color: "blue" }
          : { backgroundColor: "grayMinus3" }),
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

export default function Network() {
  const [currentView, setCurrentView] = useState<"personal" | "global">("global");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab");

  useEffect(() => {
    if (tab === "mynetwork") {
      setCurrentView("personal");
    } else {
      setCurrentView("global");
    }
  }, [tab]);

  const navigate = useNavigate();
  return (
    <AccessLayout path={PATHS.NETWORK}>
      <FeedLayout>
        <Helmet>
          <title>Network | Golvia</title>
        </Helmet>

        {/* {isMobile ? ( */}
        <Box paddingY={4} borderRadius="16px" className="*:xs:!px-4 *:md:!px-8 bg-white">
          <Stack direction="row" paddingBottom={2} spacing={2} visibility={{ lg: "visible" }}>
            <TabButton
              isactive={currentView == "global"}
              onClick={() => {
                setCurrentView("global");
                navigate(`${location.pathname}`, {
                  replace: true,
                });
              }}
            >
              Global Network
            </TabButton>
            <TabButton
              isactive={currentView == "personal"}
              onClick={() => {
                setCurrentView("personal");
                navigate(`${location.pathname}?tab=mynetwork`, {
                  replace: true,
                });
              }}
            >
              My Network
            </TabButton>
          </Stack>
          {currentView == "global" && <GlobalNetwork />}
          {currentView == "personal" && <PersonalNetwork />}
        </Box>
      </FeedLayout>
    </AccessLayout>
  );
}
