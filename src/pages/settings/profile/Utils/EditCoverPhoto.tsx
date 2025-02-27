import { CloseOutlined } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Drawer,
} from "@mui/material";
import { updateCoverPhoto } from "api/profile";
import { uploadImageAndVideo } from "api/cloudinaryApi";
import useAlert from "components/alert/useAlert";
import { updateAsync } from "api/slice/auth";
import useAuthDetails from "pages/auth/useAuthDetails";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useAppDispatch } from "store/hooks";
import { IoIosArrowRoundBack } from "react-icons/io";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { md: 700, xs: 350 },
  bgcolor: "background.paper",
  borderRadius: "7px",
  boxShadow: 24,
};

const EditCoverPhoto: React.FC<Props> = ({ open, handleClose }) => {
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [, setImage] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [, setUploadProgress] = React.useState<number>(0);
  const [loading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useAppDispatch();
  const handleUpdate = async () => {
    try {
      await dispatch(updateAsync()).unwrap();
    } catch (error) {
      console.error("Failed to update user details:", error);
    }
  };

  const handleAlert = useAlert();

  useEffect(() => {
    handleUpdate();
  }, [open]);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
  } = useDropzone({
    accept: {
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0].size > 2097152) {
        handleAlert({
          message: `Image size is too large. Please upload an image below 2MB.`,
          variant: "error",
        });
      } else {
        setImageFiles(acceptedFiles);
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onloadend = () => {
          const base64 = reader.result;
          setImageUrl(base64 as string);
        };
      }
    },
  });

  const { coverPhotoUrl } = useAuthDetails();

  useEffect(() => {
    setImageUrl(coverPhotoUrl || "");
  }, [open]);

  const handleEditCover = async (newImage: string) => {
    await updateCoverPhoto(newImage || "")
      .then(() => {
        setIsLoading(false);
        handleAlert({
          message: `Image uploaded successfully!`,
          variant: "success",
        });
        handleClose();
      })
      .catch((err) => {
        setIsLoading(false);
        handleAlert({ message: `${err.message}`, variant: "error" });
      });
  };

  const handleImageUpload = async () => {
    setIsLoading(true);
    try {
      const response = await uploadImageAndVideo(
        imageFiles[0],
        null,
        (progress) => {
          setUploadProgress(progress);
          // setImageUploadStatus(`${progress}% - Completed`);
        }
      );
      setImage(response.imageUrl);

      setUploadProgress(100);

      handleEditCover(response.imageUrl);
    } catch (error) {
      setIsLoading(false);

      handleAlert({
        message: `Image upload failed after multiple attempts. Try again - ${error}`,
        variant: "error",
      });
    }
  };

  return isMobile ? (
    <Drawer open={open} onClose={handleClose} anchor="right">
      <Box sx={{ height: "100vh", width: "100vw", bgcolor: "#333" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            py: 2,
            bgcolor: "#fff",
            height: "10vh",
          }}
        >
          {" "}
          <IconButton onClick={handleClose}>
            <IoIosArrowRoundBack style={{ color: "#000" }} />
          </IconButton>
          <Typography sx={{ fontSize: "20px", fontWeight: 600, color: "#000" }}>
            Edit Cover Photo
          </Typography>
          <IconButton onClick={handleClose}>
            {/* <CloseOutlined sx={{ color: "#000" }} /> */}
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "65vh",
            bgcolor: "#333",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              border: "1px solid #fff",
              width: "100%",
              height: "142px",
              background: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            height: "24vh",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
            }}
          >
            {loading && (
              <>
                <Typography sx={{ color: "#fff" }}>Uploading... </Typography>
                <CircularProgress size={20} />
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: 2,
              width: "100%",
            }}
          >
            <div {...getImageRootProps()} className="w-[50%]">
              <input {...getImageInputProps()} />
              <Button
                disabled={loading}
                variant="outlined"
                sx={{
                  borderRadius: "8px",
                  height: "45px",
                  color: "#fff",
                  borderColor: "#fff",
                }}
                fullWidth
              >
                Change Photo
              </Button>
            </div>

            <Button
              disabled={!imageUrl || loading || imageFiles.length === 0}
              variant="contained"
              sx={{
                borderRadius: "8px",
                height: "45px",
                width: "50%",
                "&:disabled": {
                  bgcolor: "#ccccccb7",
                  cursor: "not-allowed",
                },
              }}
              onClick={handleImageUpload}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Drawer>
  ) : (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
            py: 2,
          }}
        >
          <Typography sx={{ fontSize: "26px", fontWeight: 700 }}>
            Cover Photo
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseOutlined sx={{ color: "#000" }} />
          </IconButton>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "300px",
            bgcolor: "#333",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              border: "1px solid #fff",
              width: "100%",
              height: "142px",
              background: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              columnGap: 1,
              width: "40%",
            }}
          >
            {loading && (
              <>
                <Typography>Uploading... </Typography>
                <CircularProgress size={20} />
              </>
            )}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              alignItems: "center",
              columnGap: 2,
            }}
          >
            <div {...getImageRootProps()}>
              <input {...getImageInputProps()} />
              <Button
                disabled={loading}
                variant="outlined"
                sx={{ borderRadius: "8px", height: "45px", px: 4 }}
              >
                Change Photo
              </Button>
            </div>

            <Button
              disabled={!imageUrl || loading || imageFiles.length === 0}
              variant="contained"
              sx={{ borderRadius: "8px", height: "45px", px: 4 }}
              onClick={handleImageUpload}
            >
              Apply
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditCoverPhoto;
