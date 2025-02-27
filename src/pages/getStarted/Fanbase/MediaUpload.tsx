import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UploadIcon from "assets/icons/upload-icon.svg";
import { Avatar, Button, LinearProgress, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { uploadImageAndVideo } from "api/cloudinaryApi";

import { editFanProfile, upgradeFanProfile } from "api/profile";
import BackdropLoader from "components/loaders/Backdrop";
import useAuthDetails from "pages/auth/useAuthDetails";
import useAlert from "components/alert/useAlert";

interface Props {
  onComplete: () => void;
  onPrevious: () => void;
  professionalInfo: any | null; // Adjust type based on your data structure
  personalInformation: any | null;
}

const MediaUpload = (props: Props) => {
  const { onPrevious, professionalInfo, personalInformation } = props;
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [, setImage] = React.useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [uploadImageStatus, setImageUploadStatus] = React.useState("");

  const [isProfileEdit, setIsProfileEdit] = useState<boolean>(false);

  const [uploadProgress, setUploadProgress] = React.useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);

  const [, setTasks] = useState<string[]>([]);
  const [, setCurrentTask] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/edit-profile") {
      setIsProfileEdit(true);
    } else {
      setIsProfileEdit(false);
    }
  }, [location]);

  const previousView = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onPrevious();
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    accept: {
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/png": [".png"],
      "image/avif": [".avif"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0].size > 2097152) {
        toast.error("Image size is too large. Please upload an image below 2MB.");
      } else {
        setImageFiles(acceptedFiles);
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onloadend = () => {
          const base64 = reader.result;
          setImage(base64 as string);
        };
      }
    },
  });

  const maxRetries = 3;
  const handleImageUpload = async (attempt = 0) => {
    setIsLoading(true);
    try {
      const response = await uploadImageAndVideo(imageFiles[0], null, (progress) => {
        setUploadProgress(progress);
        setImageUploadStatus(`${progress}% - Completed`);
      });
      setImageUrl(response.imageUrl);
      setIsLoading(false);
      toast.success("Image uploaded successfully!");
      setUploadProgress(100);
      completeTask();
    } catch (error) {
      setIsLoading(false);
      if (attempt < maxRetries) {
        handleImageUpload(attempt + 1);
      } else {
        // toast.error("Image upload failed after multiple attempts.");
        completeTask();
      }
    }
  };

  React.useEffect(() => {
    if (imageFiles.length > 0) {
      handleImageUpload();
    }
  }, [imageFiles]);

  const completeTask = () => {
    setTasks((prevTasks) => prevTasks.slice(1));
    setCurrentTask(null);
  };

  const { favouriteSport, selectedRegions, selectedNotifications } = professionalInfo || {};

  const { city, country } = personalInformation || {};

  const { profilePicture, firstName, lastName, profileType, email, sportType } = useAuthDetails();
  useEffect(() => {
    if (profilePicture != null) {
      setImageUrl(profilePicture.toString());
    } else {
      setImageUrl(""); // or any default value you prefer
    }
  }, [profilePicture]);

  const [upgradeLoader, setUpgradeLoader] = useState(false);

  const navigate = useNavigate();

  const handleAlert = useAlert();

  const handleUpgradeProfile = async () => {
    setUpgradeLoader(true);
    await upgradeFanProfile(
      // isProfileEdit ? "patch" : "post",
      country,
      city,
      email ?? "",
      favouriteSport,
      selectedNotifications,
      selectedRegions,
      imageUrl
    )
      .then((res) => {
        console.log(res);
        setUpgradeLoader(false);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        setUpgradeLoader(false);
        handleAlert({ message: `${err.message}`, variant: "error" });
      });
  };
  const handleEditProfile = async () => {
    setUpgradeLoader(true);
    await editFanProfile(
      country,
      city,
      email ?? "",
      favouriteSport,
      selectedNotifications,
      selectedRegions,
      imageUrl
    )
      .then((res) => {
        console.log(res);
        setUpgradeLoader(false);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        setUpgradeLoader(false);
        handleAlert({ message: `${err.message}`, variant: "error" });
      });
  };

  return (
    <>
      {upgradeLoader && <BackdropLoader />}
      <Stack
        direction={{ xs: "column-reverse", lg: "row" }}
        padding={{ xs: 2, md: 4 }}
        spacing={{ xs: 2, lg: 5 }}
      >
        <Stack width={{ xs: "100%", lg: "50%" }}>
          <h2 className="text-[#AAB1C0] text-xl font-medium">Upload Picture</h2>
          <div className="mt-8 border border-[#B4C1D4] border-dashed rounded-2xl bg-quaternary py-8 text-senary">
            {imageFiles.length >= 1 ? (
              <div className="px-10 mb-6">
                <Stack justifyContent="space-between" marginBottom={2} alignItems="center">
                  <img src={UploadIcon} alt="upload icon" className="mt-3 mb-2" />
                  {uploadProgress === 100 ? (
                    <div {...getImageRootProps()}>
                      <input {...getImageInputProps()} />
                      <p className="text-sm font-medium text-primary underline cursor-pointer">
                        Re-upload Picture
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-[#dedede] underline cursor-not-allowed">
                      Re-upload Picture
                    </p>
                  )}
                </Stack>
                <p className="text-senary text-sm mb-5">{imageFiles[0]?.name}</p>
                <LinearProgress
                  variant="buffer"
                  value={uploadProgress}
                  valueBuffer={uploadProgress + 10}
                />
                <p className="text-nonenary text-xs mt-2">{uploadImageStatus}</p>
              </div>
            ) : (
              <div className="px-10" {...getImageRootProps()}>
                <h3 className="font-medium text-base ">Upload Profile Picture</h3>
                <img src={UploadIcon} alt="upload icon" className="mt-3 mb-2" />
                <p>Drop your photo here</p>
                <input {...getImageInputProps()} />
                <button className="text-primary border border-primary bg-quaternary text-sm mt-4 py-1 px-6 rounded-md font-normal mb-3">
                  Browse File
                </button>
              </div>
            )}
            <p className="text-xs px-10 mt-2 mb-8">
              File type: <span className="text-[#909090]">PNG, JPEG</span> - File size:{" "}
              <span className="text-[#909090]">2MB max</span>
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={previousView}
              sx={{ py: 1.5, mt: 3 }}
              className={`text-primary border border-primary bg-white text-base w-full mt-6 py-3 rounded-lg font-medium  ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } `}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              sx={{ py: 1.5, mt: 3 }}
              disabled={isLoading || !imageUrl}
              onClick={isProfileEdit ? handleEditProfile : handleUpgradeProfile}
              className={`bg-primary text-white text-base w-full mt-6 py-3 rounded-lg font-medium ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Submit
            </Button>
          </div>
        </Stack>
        <Stack width={{ xs: "100%", lg: "50%" }}>
          <h2 className="text-[#AAB1C0] text-xl font-medium">Profile Display</h2>
          <div>
            <div className="w-full mt-8 lg:mt-14 bg-quaternary rounded-2xl pb-4">
              <div className="px-8 pt-8 py-4">
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <div className="relative">
                    <Avatar src={imageUrl || ""} sx={{ width: 90, height: 90 }} />
                    <div className="w-6 h-6 bg-nonenary rounded-full absolute top-0 left-16 border-white border-4"></div>
                  </div>
                  <Stack>
                    <Stack direction={{ xs: "column", md: "column" }} spacing={{ md: 0.5 }}>
                      <h1 className="text-senary text-xl font-medium">{`${firstName} ${lastName}`}</h1>
                      <div className="bg-primary py-1 px-2 text-white rounded-lg text-xs w-fit h-fit">
                        <p>{`${profileType} - ${sportType}`}</p>
                      </div>
                    </Stack>
                    {/* <p className="text-[#7D7D7D] overflow-hidden flex items-center gap-1 w-full text-xs mt-2">
                      Location:{" "}
                      <span className="text-black whitespace-nowrap text-ellipsis overflow-hidden text-xs w-[40%]">
                        {`${city}, ${country}`}
                      </span>
                    </p>
                    <p className="text-[#7D7D7D] text-xs">
                      Area of Specialization:{" "}
                      <span className="text-black">{areaofspecialization}</span>
                    </p> */}
                    <div></div>
                  </Stack>
                </Stack>
              </div>
            </div>
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default MediaUpload;
