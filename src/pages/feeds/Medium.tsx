import { Box, Grid2 as Grid, IconButton, LinearProgress } from "@mui/material";
import useAsyncCreateObjectURL from "pages/feeds/hooks/useAsyncCreateObjectURL";
import { UploadHandler } from "pages/feeds/hooks/useUploadHandler";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import ReactPlayer from "react-player";
import { ReactComponent as SuccessIcon } from "assets/icons/tick-circle.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info-circle.svg";

interface Props {
  file: File;
  filesCount: number;
  uploadHandler: UploadHandler;
  setIsChallengePost: React.Dispatch<React.SetStateAction<boolean>>;
}

export default memo(function Medium(props: Props) {
  const { file, filesCount, uploadHandler, setIsChallengePost } = props;
  const src = useAsyncCreateObjectURL(file);
  const { setMediaData, mediaData, cancelUpload } = uploadHandler;
  const imageRef = useRef<HTMLImageElement>(null);
  const mediaType = file.type.includes("video") ? "video" : "image";
  const [hovered, setHovered] = useState(false);

  const progress = useMemo(() => {
    let value = 0;

    if (mediaData) {
      value = mediaData[file.name]?.progress;
    }

    return value;
  }, [mediaData, file.name]);

  const hasError = useMemo(() => {
    let error = false;

    if (mediaData) {
      error = !!mediaData[file.name]?.error;
    }

    return error;
  }, [mediaData, file.name]);

  const handleCancel = () => {
    setIsChallengePost(false);
    cancelUpload(file);
  };

  useEffect(() => {
    if (mediaData?.[file.name]) {
      return;
    }

    setMediaData((prev) => ({
      ...prev,
      [file.name]: {
        file,
        imageRef,
        progress: 0,
      },
    }));
  }, [file.name]);

  return (
    <Grid
      ref={imageRef}
      size={12 / (filesCount > 1 ? 2 : 1)}
      position="relative"
      borderRadius="10px"
      overflow="hidden"
      maxHeight="350px"
      className="shadow-md"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      {mediaType === "image" && (
        <img src={src} width="100%" alt={file.name} className="object-cover h-full" />
      )}
      {mediaType === "video" && (
        <ReactPlayer
          url={src}
          playing={false}
          controls={true}
          width="100%"
          className="max-w-full"
        />
      )}
      <Box width="100%" position="absolute" bottom={0}>
        <LinearProgress
          variant="determinate"
          color="success"
          value={progress}
          className="!h-[5px]"
        />
      </Box>
      {progress == 100 && (
        <SuccessIcon
          style={{ position: "absolute", bottom: "20px", right: "10px" }}
          className="text-gv-green_3EC28B"
        />
      )}{" "}
      {hasError && (
        <InfoIcon
          style={{ position: "absolute", bottom: "20px", right: "10px" }}
          className="text-gv-red_FF5F3E shadow-lg"
        />
      )}
      <IconButton
        onClick={handleCancel}
        sx={{
          position: "absolute",
          backgroundColor: "whitesmoke",
          padding: 0.5,
          top: 8,
          right: 8,
          display: { lg: hovered ? "block" : "none" },
          ":hover": { backgroundColor: "white" },
        }}
      >
        <IoMdClose className="text-xs md:text-xl" />
      </IconButton>
    </Grid>
  );
});
