import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import SettingsLayout from "layouts/SettingsLayout";
import { SwitchGv } from "components/SwitchGv";
import { useState } from "react";

const NotificationSettings = () => {
  const [state, setState] = useState(true);

  const handleChange = () => {
    setState((prevState) => !prevState);
  };

  return (
    <SettingsLayout>
      <Stack direction="row" justifyContent="space-between" paddingY={4}>
        <Typography variant="h$24" className="font-medium">
          Notification Settings
        </Typography>
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      <Stack spacing={3} width="lg" paddingTop={4} paddingBottom={6}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Comment Notification</Typography>
          <SwitchGv
            checked={state}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Connection Request</Typography>
          <SwitchGv
            checked={state}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Update from network</Typography>
          <SwitchGv
            checked={state}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Tags</Typography>
          <SwitchGv
            checked={state}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Video</Typography>
          <SwitchGv
            checked={state}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
        </Stack>
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      <Box paddingY={4}>
        <Button variant="contained" size="large" className="w-[310px] h-[62px]">
          Save
        </Button>
      </Box>
    </SettingsLayout>
  );
};

export default NotificationSettings;
