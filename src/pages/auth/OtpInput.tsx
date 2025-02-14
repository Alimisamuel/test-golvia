import { InputLabel } from "@mui/material";

import { MuiOtpInput } from "mui-one-time-password-input";
import { styled } from "@mui/system";

interface Props {
  value: string;
  handleChange: (value: string) => void;
}

export default function OtpInput(props: Props) {
  const { value, handleChange } = props;

  return (
    <>
      <InputLabel sx={{}}>Enter code</InputLabel>
      <CustomOtp value={value} handleChange={handleChange} />
    </>
  );
}

const CssOtpInput = styled(MuiOtpInput)(() => ({
  "& input": {
    borderRadius: "10px",
    color: "#3373E0",
    fontFamily: "outfit",
    width: "25px",
    height: "38px",
    fontSize: "18px",
    "&:focus": {},
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "10px",
    },
    "&:hover fieldset": {},
    "&.Mui-focused fieldset": {
      color: "#3373E0",
    },
  },
}));

const CustomOtp: React.FC<Props> = ({ value, handleChange }) => {
  return (
    <CssOtpInput
      value={value}
      onChange={handleChange}
      length={6}
      sx={{ mt: 1, display: "flex", gap: { md: "20px", xs: "8px" } }}
      TextFieldsProps={{
        type: "number",
        inputProps: {
          inputMode: "numeric",
          pattern: "[0-9]*",
          style: {
            borderRadius: "10px",
            fontFamily: "outfit",
            width: "20px",
            height: "38px",
            fontSize: "18px",
          },
        },
        size: "small",
      }}
    />
  );
};
