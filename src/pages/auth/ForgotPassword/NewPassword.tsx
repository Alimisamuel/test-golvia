import { useState } from "react";
import Icons from "constants/Icons";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/path";
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { cofirmForgetPassword } from "api/auth";
import useAlert from "components/alert/useAlert";
import BackdropLoader from "components/loaders/Backdrop";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const NewPassword = () => {
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token") || "";
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const { newPassword, confirmPassword } = passwords;
  const [showPassword, setShowPassword] = useState(false);
  const handleAlert = useAlert();

  const handleConfirmPassword = async () => {
    setIsLoading(true);

    await cofirmForgetPassword(newPassword, confirmPassword, token)
      .then(() => {
        setActiveStep(2);
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading && <BackdropLoader />}
      <div className="h-[100vh] w-full bg-blue-100 flex flex-col items-center justify-center ">
        <img src={Icons.logoBlack} width={100} alt="Golvia logo" />
        {activeStep === 1 && (
          <div className="mt-8 md:px-16 xs:px-5 bg-white md:w-[40%]  xs:w-[85%]  p-3 rounded-[12px] flex flex-col items-center justify-center pb-14">
            <h2 className="font-[600] text-[24px] mt-8">Set new password</h2>

            <div className="mt-10 w-full">
              <TextField
                placeholder="***********"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                InputProps={{
                  style: { borderRadius: "9px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            sx={{ fontSize: "16px" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="dense"
                placeholder="***********"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                sx={{ mt: 2 }}
                InputProps={{
                  style: { borderRadius: "9px" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon sx={{ fontSize: "16px" }} />
                        ) : (
                          <VisibilityOffOutlinedIcon
                            sx={{ fontSize: "16px" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
              />

              <div>
                <Button
                  onClick={handleConfirmPassword}
                  disabled={!newPassword || !confirmPassword || isLoading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 4, py: 2 }}
                >
                  Continue
                </Button>

                <Link to={PATHS.LOGIN}>
                  <p className="mt-6 text-xs text-center text-primary underline">
                    {" "}
                    Back to Login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div className="mt-8 px-16 md:px-16 xs:px-5 bg-white md:w-[40%]  xs:w-[85%] p-3 rounded-[12px] flex flex-col items-center justify-center pb-14">
            <IoCheckmarkCircleOutline
              style={{
                fontSize: "50px",
                marginTop: "20px",
                color: "#3EC28B",
              }}
            />
            <Typography sx={{ fontWeight: 600, fontSize: "20px", mt: 3 }}>
              All Done!
            </Typography>
            <Typography sx={{ mt: 1 }}>
              Your password has been reset successfully
            </Typography>
            <Link to={PATHS.LOGIN}>
              <Button
                variant="contained"
                fullWidth
                sx={{ py: 2, mt: 5, px: 5 }}
              >
                Back to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NewPassword;
