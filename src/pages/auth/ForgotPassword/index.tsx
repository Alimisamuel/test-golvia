import { Button, TextField } from "@mui/material";
import { forgotPassword } from "api";
import useAlert from "components/alert/useAlert";
import BackdropLoader from "components/loaders/Backdrop";
import Icons from "constants/Icons";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "Routes/routes.path";

const ForgotPassword = () => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAlert = useAlert();

  const handleSendEmail = async () => {
    setIsLoading(true);
    await forgotPassword(email)
      .then(() => {
        setIsLoading(false);
        setActiveStep(2);
      })
      .catch((err) => {
        setIsLoading(false);
        handleAlert({ message: `${err.message}`, variant: "error" });
      });
  };

  return (
    <>
      {isLoading && <BackdropLoader />}
      <div className="h-[100vh] w-full bg-blue-100 flex flex-col items-center justify-center ">
        <img src={Icons.logoBlack} width={100} alt="Golvia logo" />
        {activeStep === 1 && (
          <div className="mt-8 md:px-16 xs:px-5 bg-white md:w-[40%]  xs:w-[85%] p-3 rounded-[12px] flex flex-col items-center justify-center pb-14">
            <h2 className="font-[600] text-[24px] mt-8">Forgot Password?</h2>
            <p className="mt-4">
              Don’t worry! Fill in your email and we will send you a link to reset your password.
            </p>

            <div className="mt-10 w-full">
              <TextField
                placeholder="example@gmail.com"
                label="Email Address"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div>
                <Button
                  onClick={handleSendEmail}
                  disabled={!email || isLoading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 4, py: 2 }}
                >
                  Continue
                </Button>

                <Link to={PATHS.LOGIN}>
                  <p className="mt-6 text-xs text-center text-primary underline"> Back to Login</p>
                </Link>
              </div>
            </div>
          </div>
        )}
        {activeStep === 2 && (
          <div className="mt-8 md:px-16 xs:px-5 bg-white md:w-[40%]  xs:w-[85%] p-3 rounded-[12px] flex flex-col items-center justify-center pb-14">
            <img src={Icons.email2} className="mt-4" />

            <h2 className="font-[500] text-[24px] mt-3 ">We have sent you an email</h2>
            <p className="mt-4">
              Thanks! An email was sent that will as you to click on a link to verify that your own
              this account. If you dont get the email,{" "}
              <span className="text-[#1D69D8]">please contact </span>
            </p>

            <div className="mt-10 w-full">
              <TextField
                value={email}
                placeholder="John.smith@gmail.com"
                label="Email Address"
                fullWidth
              />

              <div>
                <Button
                  onClick={handleSendEmail}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 2, py: 2 }}
                >
                  Resend Email
                </Button>
                <Link to={PATHS.LOGIN}>
                  <p className="mt-6 text-xs text-center text-primary underline"> Back to Login</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
