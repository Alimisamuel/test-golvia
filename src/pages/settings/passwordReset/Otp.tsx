import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import OtpInput from "pages/auth/OtpInput";

const ResetOtp = () => {
  const [otp] = useState<string>("");

  return (
    <>
      <OtpInput value={otp} handleChange={() => null} />

      <Divider className="w-screen !ml-[-50px]" />

      <Box paddingY={4}>
        <Button
          disabled={otp.length < 6}
          variant="contained"
          size="large"
          className="w-[310px] h-[62px]"
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

export default ResetOtp;
