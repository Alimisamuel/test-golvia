import React from "react";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import CameraIcon from "assets/icons/Camera.svg";
import SmileIcon from "assets/icons/Smile.svg";
import HomeIcon from "assets/icons/Home.svg";
import EyeIcon from "assets/icons/Eye.svg";
import RefreshIcon from "assets/icons/Refresh.svg";
import ModalSkeleton from "components/modals/ModalSkeleton";
import { IoMdClose } from "react-icons/io";
import { CircularProgress, Stack } from "@mui/material";
import Webcam from "react-webcam";
import { FaCircleCheck } from "react-icons/fa6";
import { toast } from "react-toastify";

interface Props {
  onComplete: () => void;
  onPrevious: () => void;
}

const PhotoIdentityVerification = (props: Props) => {
  const { onComplete } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [uploadStatus, setUploadStatus] = React.useState<
    "pending" | "in progress" | "success" | "error"
  >("pending");
  const [isCaptured, setIsCaptured] = React.useState(false);
  const [photo, setPhoto] = React.useState<string | null>(null);
  const webcamRef = React.useRef<Webcam>(null);
  const [isCameraOpen, setIsCameraOpen] = React.useState(false);

  const handleError = (/*error: any*/) => {
    // console.error( "Webcam error:", error );
    toast.error("Error capturing photo");
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsCaptured(false);
    setPhoto(null);
    setUploadStatus("pending");
    setIsCameraOpen(false);
  };

  const handleImageSubmission = () => {
    handleClose();
    setUploadStatus("in progress");
    setTimeout(() => {
      setUploadStatus("success");
      onComplete();
    }, 4000);
  };

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhoto(imageSrc);
      setIsCaptured(true);
    } else {
      toast.error("Failed to capture photo");
    }
  };

  const handleUserMedia = () => {
    setIsCameraOpen(true);
  };

  return (
    <Stack
      alignItems="center"
      paddingX={2}
      paddingY={{ xs: 4, md: 8 }}
      width="100%"
      className="text-[#626262]"
    >
      {uploadStatus !== "success" && (
        <div>
          {uploadStatus === "pending" && <h3 className="text-sm mb-3">You are upgrading to</h3>}
          <h3 className="text-[#1A1C1F] font-medium text-4xl mb-10">Photo Verification</h3>
          {uploadStatus === "pending" && (
            <div>
              {ListItem.map((item) => (
                <div key={item.id} className="flex items-center my-6 space-x-3">
                  <img src={item?.icon} height={25} width={25} alt="camera icon" />
                  <p className="max-w-96 text-base flex">{item.paragraph}</p>
                </div>
              ))}
              <div className="flex items-start bg-[#5656CA14] rounded-lg px-8 py-5 space-x-3 my-10 ">
                <CiCircleAlert className="text-xl mt-1" />
                <p className="max-w-80 text-sm text-[#1A1C1F]">
                  Your photograph is safe and will only be used for identification purposes.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-nonenary w-full py-3 rounded-lg text-white text-base"
              >
                Start Photo Verification
              </button>
            </div>
          )}
          {uploadStatus === "in progress" && (
            <div className="text-center flex flex-col items-center justify-center">
              <CircularProgress sx={{ color: "#3EC28B", marginTop: "10px" }} size="3rem" />
              <p className="text-sm text-[#1A1C1F] mt-10">Your photograph is being verified.</p>
              <p className="text-xs text-[#9E9E9E]">This should not take too long.</p>
            </div>
          )}
        </div>
      )}
      {uploadStatus === "success" && (
        <div>
          <div>
            <CiCircleCheck className="text-nonenary text-3xl mb-2" />
            <h3 className="text-[#1A1C1F] font-medium text-4xl">Setup Completed</h3>
            <p className="text-sm text-[#1A1C1F] mt-6">Photo verified</p>
            <p className="text-sm text-[#9E9E9E]">And your profile has been set up successfully</p>
            <button className="bg-nonenary w-full py-3 rounded-lg text-white text-base mt-6">
              Continue to Golvia
            </button>
          </div>
        </div>
      )}
      <ModalSkeleton open={isModalOpen} handleClose={handleClose}>
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-medium">Take Photo</h3>
          <IoMdClose className="text-xl cursor-pointer" onClick={handleClose} />
        </div>
        <p className="text-[#626262] mt-3">
          Ensure your face is within the oval frame and click "Take Photo"
        </p>
        <div className="relative h-72 bg-gray-300 rounded-xl mt-6 mb-10 flex justify-center items-center">
          {isCaptured ? (
            <img
              src={photo || ""}
              alt="Captured"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover rounded-xl"
              onUserMedia={handleUserMedia}
              onUserMediaError={handleError}
            />
          )}

          <div className="absolute inset-0">
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "radial-gradient(circle, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0.6) 90%)",
                zIndex: 1,
              }}
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-72 h-72 bg-transparent rounded-full border-4 border-nonenary overflow-hidden" />
            </div>
          </div>
          {isCaptured && (
            <div className="absolute bottom-3 flex justify-center items-center">
              <FaCircleCheck className="text-nonenary text-3xl" />
            </div>
          )}
        </div>
        {isCaptured ? (
          <div className="flex w-full space-x-4">
            <button
              onClick={() => {
                setIsCaptured(false);
                setPhoto(null);
              }}
              className="w-full flex items-center justify-center bg-none border border-[#AFAFAE] text-[#626262] py-3 rounded-lg text-base"
            >
              <img src={RefreshIcon} className="mr-2" height={25} width={25} alt="refresh icon" />
              Re-take Photo
            </button>
            <button
              onClick={handleImageSubmission}
              className="w-full bg-nonenary py-3 rounded-lg text-white text-base"
            >
              Yes, use this photo
            </button>
          </div>
        ) : (
          <button
            onClick={capture}
            className={`w-full py-3 rounded-lg text-white text-base ${
              isCameraOpen ? "bg-nonenary" : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isCameraOpen}
          >
            Take Photo
          </button>
        )}
      </ModalSkeleton>
    </Stack>
  );
};

export default PhotoIdentityVerification;

const ListItem = [
  {
    id: 1,
    icon: CameraIcon,
    paragraph:
      "We need access to your camera so that we can take your photograph and proof-of-life images",
  },
  {
    id: 2,
    icon: SmileIcon,
    paragraph: "Please, face the camera and keep a straight face",
  },
  {
    id: 3,
    icon: HomeIcon,
    paragraph: "Ensure you are in a well-lit environment",
  },
  {
    id: 4,
    icon: EyeIcon,
    paragraph: "Remove contacts, glasses, and other facial accessories before you start.",
  },
];
