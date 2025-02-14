import { Box, Modal } from "@mui/material";
import React from "react";

interface ModalSkeletonProps {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const ModalSkeleton = ({ open, handleClose, children }: ModalSkeletonProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default ModalSkeleton;

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 470 },
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
