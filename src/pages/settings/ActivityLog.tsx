import { Avatar, Box, Button, Divider, Stack, Typography } from "@mui/material";
import SettingsLayout from "layouts/SettingsLayout";

const ActivityLog = () => {
  return (
    <SettingsLayout>
      <Stack direction="row" justifyContent="space-between" paddingY={4}>
        <Typography variant="h$24" className="font-medium">
          Activity Log
        </Typography>
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      <Stack component="ul" role="list" paddingY={4} className="divide-y divide-gray-200">
        {[...Array(10)].map((i, index) => (
          <Stack
            spacing={3}
            width="lg"
            paddingTop={{ xs: index != 0 ? 4 : 0, md: index != 0 ? 6 : 0 }}
            paddingBottom={{ xs: 2, md: 5 }}
            key={index}
          >
            <Typography variant="p$14" className="font-medium">
              October 10, 2024
            </Typography>
            <Stack direction="row" alignItems="center" spacing={3} className="w-full">
              <Avatar
                alt="user"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                sx={{ height: 45, width: 45 }}
              />
              <Stack
                direction="row"
                alignItems="start"
                justifyContent="space-between"
                spacing={2}
                className="w-full"
              >
                <Stack>
                  <Typography variant="p$14" className="font-medium">
                    You commented on <b>James Martins </b>
                    Post{" "}
                  </Typography>
                  <Typography variant="p$14" color="textSecondary" className="font-medium">
                    Enjoy the rest of your day
                  </Typography>
                </Stack>
                <Typography
                  variant="p$14"
                  color="textSecondary"
                  alignSelf="start"
                  className="font-medium"
                >
                  4:30 PM
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      <Box paddingY={4}>
        <Button variant="contained" size="large" className="w-full md:w-[310px] h-[62px]">
          Save
        </Button>
      </Box>
    </SettingsLayout>
  );
};

export default ActivityLog;
