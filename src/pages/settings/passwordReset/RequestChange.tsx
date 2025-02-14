import { Box, Button, Divider, InputLabel, Stack, TextField } from "@mui/material";

const ResetOtp = () => {
  return (
    <>
      <Stack spacing={1} paddingTop={4} paddingBottom={15} className="w-[415px]">
        <InputLabel>Email</InputLabel>
        <TextField placeholder="john@doe@google.com" fullWidth />
      </Stack>

      <Divider className="w-screen !ml-[-50px]" />

      <Box paddingY={4}>
        <Button variant="contained" size="large" className="w-[310px] h-[62px]">
          Request for Change Password
        </Button>
      </Box>
    </>
  );
};

export default ResetOtp;
