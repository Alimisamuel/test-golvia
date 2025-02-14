import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadIcon from "assets/icons/upload-icon.svg";
import { Avatar, Button, LinearProgress, Stack } from "@mui/material";
import { useDropzone } from "react-dropzone";

import ReactPlayer from "react-player";
import { uploadImageAndVideo } from "api/cloudinaryApi";
import { useAppSelector } from "store/hooks";
import { selectAuth } from "pages/auth/slice";
import { editAtheleteProfile, upgradeAtheleteProfile } from "api";
import BackdropLoader from "components/loaders/Backdrop";
import useAlert from "components/alert/useAlert";
import useAuthDetails from "pages/auth/useAuthDetails";
import { AthleteProfilePayload } from "api/types";

interface Props {
  onComplete: () => void;
  onPrevious: () => void;
  clubInformation: any | null; // Adjust type based on your data structure
  personalInformation: any | null;
  initialValues: AthleteProfilePayload | null;
  isProfileEdit: boolean;
}

const MediaUpload = (props: Props) => {
  const { onPrevious, clubInformation, personalInformation, initialValues, isProfileEdit } = props;
  const [imageFiles, setImageFiles] = React.useState<File[]>([]);
  const [videoFiles, setVideoFiles] = React.useState<File[]>([]);
  const [, setImage] = React.useState("");
  const [, setVideo] = React.useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [uploadImageStatus, setImageUploadStatus] = React.useState("");
  const [uploadVideoStatus, setVideoUploadStatus] = React.useState("");
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [uploadVideoProgress, setVideoUploadProgress] = React.useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const [, setTasks] = useState<string[]>([]);
  const [, setCurrentTask] = useState<string | null>(null);

  const handleAlert = useAlert();

  const { asset } = useAuthDetails();

  useEffect(() => {
    if (initialValues) {
      setImageUrl(asset?.profilePictureUrl || "");
      setVideoUrl(asset?.profileReelUrl || "");
    }
  }, [initialValues]);

  //   React.useEffect(() => {
  //   if (tasks.length && !currentTask) {
  //     const nextTask = tasks[0];
  //     setCurrentTask(nextTask);
  //     if (nextTask === "image") {
  //       handleImageUpload();
  //     } else if (nextTask === "video") {
  //       handleVideoUpload();
  //     }
  //   }
  // }, [tasks, currentTask]);

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
          setImage(base64 as string);
        };
      }
    },
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    accept: {
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles[0].size > 31457280) {
        handleAlert({
          message: `Video size exceeds 30MB. Please upload a smaller video.`,
          variant: "error",
        });
      } else {
        setVideoFiles(acceptedFiles);
        const reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);

        reader.onloadend = () => {
          const base64 = reader.result;
          setVideo(base64 as string);
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
      handleAlert({
        message: `Image uploaded successfully!`,
        variant: "success",
      });
      setUploadProgress(100);
      completeTask();
    } catch (error) {
      setIsLoading(false);
      if (attempt < maxRetries) {
        handleImageUpload(attempt + 1);
      } else {
        handleAlert({
          message: `Image upload failed after multiple attempts. Try again - ${error}`,
          variant: "error",
        });

        completeTask();
      }
    }
  };

  React.useEffect(() => {
    if (imageFiles.length > 0) {
      handleImageUpload();
    }
  }, [imageFiles]);
  React.useEffect(() => {
    if (videoFiles.length > 0) {
      handleVideoUpload();
    }
  }, [videoFiles]);

  const handleVideoUpload = async (attempt = 0) => {
    setIsLoading(true);
    try {
      const response = await uploadImageAndVideo(null, videoFiles[0], (progress) => {
        setVideoUploadProgress(progress);
        setVideoUploadStatus(`${progress}% - Completed`);
      });
      setIsLoading(false);
      setVideoUrl(response.videoUrl);

      handleAlert({
        message: `Video uploaded successfully!`,
        variant: "success",
      });
      completeTask();
    } catch (error) {
      setIsLoading(false);
      if (attempt < maxRetries) {
        handleVideoUpload(attempt + 1);
      } else {
        handleAlert({
          message: `Video upload failed after multiple attempts. Try again - ${error}`,
          variant: "error",
        });
        completeTask();
      }
    }
  };

  const completeTask = () => {
    setTasks((prevTasks) => prevTasks.slice(1));
    setCurrentTask(null);
  };

  const auth = useAppSelector(selectAuth);

  const user = auth.data?.user;
  const { firstName, lastName, sportType } = user || {};

  const { profilePicture } = useAuthDetails();

  useEffect(() => {
    if (profilePicture != null) {
      setImageUrl(profilePicture.toString());
    } else {
      setImageUrl(""); // or any default value you prefer
    }
  }, [profilePicture]);

  const { age, currentclub, preferredclub, preferredfoot, preferredposition, yearsofexperience } =
    clubInformation || {};

  const { biography, height, location, weight } = personalInformation || {};

  const [upgradeLoader, setUpgradeLoader] = useState(false);

  const navigate = useNavigate();

  const handleUpgradeProfile = async () => {
    setUpgradeLoader(true);
    await upgradeAtheleteProfile(
      location,
      age,
      parseFloat(yearsofexperience),
      height,
      weight,
      biography,
      currentclub,
      preferredposition,
      preferredfoot,
      preferredclub,
      "Footballer",
      imageUrl,
      videoUrl
    )
      .then((res) => {
        console.log(res);
        setUpgradeLoader(false);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
        setUpgradeLoader(false);
      });
  };
  const handleEditProfile = async () => {
    setUpgradeLoader(true);
    await editAtheleteProfile(
      location,
      age,
      parseFloat(yearsofexperience),
      height,
      weight,
      biography,
      currentclub,
      preferredposition,
      preferredfoot,
      preferredclub,
      "Footballer",
      imageUrl,
      videoUrl
    )
      .then((res) => {
        console.log(res);
        setUpgradeLoader(false);
        navigate("/get-started?section=completed");
      })
      .catch((err) => {
        handleAlert({ message: `${err.message}`, variant: "error" });
        setUpgradeLoader(false);
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
          <h2 className="text-[#AAB1C0] text-xl font-medium">Profile/Portfolio Setup</h2>

          <p>Set up your profile to be displayed to potential scouts.</p>
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
            <div className="border w-full border-[#B4C1D4] border-dashed my-3"></div>
            {videoFiles.length >= 1 ? (
              <div className="px-10 mb-6">
                <div className="flex w-full justify-between items-center mb-5">
                  <img src={UploadIcon} alt="upload icon" className="mt-3 mb-2" />
                  {uploadVideoProgress === 100 ? (
                    <div {...getVideoRootProps()}>
                      <input {...getVideoInputProps()} />
                      <p className="text-sm font-medium text-primary underline cursor-pointer">
                        Re-upload Video
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm font-medium text-[#dedede] underline cursor-not-allowed">
                      Re-upload Video
                    </p>
                  )}
                </div>
                <p className="text-senary text-sm mb-5">{videoFiles[0]?.name}</p>
                <LinearProgress
                  variant="buffer"
                  valueBuffer={uploadVideoProgress + 10}
                  value={uploadVideoProgress}
                />
                <p className="text-nonenary text-xs mt-2">{uploadVideoStatus}</p>
              </div>
            ) : (
              <div className="px-10" {...getVideoRootProps()}>
                <h3 className="font-medium text-base ">Upload Video</h3>
                <img src={UploadIcon} alt="upload icon" className="mt-3 mb-2" />
                <p>Drop your video here</p>
                <input {...getVideoInputProps()} />
                <button className="text-primary border border-primary bg-quaternary text-sm mt-4 py-1 px-6 rounded-md font-normal mb-3">
                  Browse File
                </button>
              </div>
            )}
            <p className="text-xs px-10 mt-2">
              File type: <span className="text-[#909090]">MOV, MP4</span> - File size:{" "}
              <span className="text-[#909090]">30MB max</span>
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
                        <p>{`${sportType} - ${preferredposition}`}</p>
                      </div>
                    </Stack>
                    <p className="text-[#7D7D7D] overflow-hidden flex items-center gap-1 w-full text-xs mt-2">
                      Location:{" "}
                      <span className="text-black whitespace-nowrap text-ellipsis overflow-hidden text-xs w-[40%]">
                        {location}
                      </span>
                    </p>
                    <p className="text-[#7D7D7D] text-xs">
                      Current Club: <span className="text-black">{currentclub}</span>
                    </p>
                    <div>
                      {/* <button className="inline-flex bg-nonenary px-3 py-1.5 mt-1 text-white rounded-lg">
                      Send Message
                    </button> */}
                    </div>
                  </Stack>
                </Stack>
              </div>
              <hr className="mt-3" />
              <Stack marginTop={2} paddingX={4}>
                <h3 className="text-senary text-base font-medium">My Video Reel</h3>
                <div className="relative mt-5 rounded-xl bg-white border border-white h-44 w-full overflow-hidden z-0">
                  <ReactPlayer
                    url={videoUrl || ""}
                    playing={false}
                    controls={true}
                    width="100%"
                    height="100%"
                  />
                </div>
                <Avatar
                  src={imageUrl || ""}
                  sx={{ width: 40, height: 40 }}
                  className="absolute bottom-48 left-8 z-50 border-2 border-white"
                />
              </Stack>
            </div>
            {/* <div className="flex justify-end mt-8 underline">
              <Link to={"/feed"}>Skip Profile Setup</Link>
            </div> */}
          </div>
        </Stack>
      </Stack>
    </>
  );
};

export default MediaUpload;
