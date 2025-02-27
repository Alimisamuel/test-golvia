import React from "react";
import { Avatar, Box, Modal } from "@mui/material";
import Avartar1 from "../../assets/dummy_avatar_img/avatar_img.svg";
import CircularLoader from "../loaders/CircularLoader";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../routes/path";

interface CompleteProfileModalProps {
  open: boolean;
  handleClose: () => void;
}

const CompleteProfileModal = ({
  open,
  handleClose,
}: CompleteProfileModalProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(PATHS.GET_STARTED);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h3 id="modal-modal-title" className="text-center text-lg px-4">
            Complete your profile to enjoy more features
          </h3>
          <div className="mt-4 flex bg-slate-200 py-4 px-6 rounded-xl space-x-3">
            <div className="flex">
              <div className="z-50">
                <Avatar
                  src={Avartar1}
                  alt={"a user"}
                  sx={{ width: 56, height: 56 }}
                />
              </div>
              <div className="-ml-3">
                <CircularLoader value={40} size={55} />
              </div>
            </div>
            <div className="">
              <h3 className="text-[#848484] text-sm">Profile Level</h3>
              <p className="text-xs">
                You are 40% away from completing your profile
              </p>
            </div>
          </div>
          <button
            onClick={handleNavigate}
            className="bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium"
          >
            Complete Profile
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CompleteProfileModal;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
