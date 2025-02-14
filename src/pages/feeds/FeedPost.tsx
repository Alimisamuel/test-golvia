import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Button,
  Grid2 as Grid,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Avartar1 from "assets/dummy_avatar_img/avatar_img.svg";
import { ReactComponent as UploadImageIcon } from "assets/icons/upload_image_icon.svg";
import { ReactComponent as UploadVideoIcon } from "assets/icons/upload_video_icon.svg";
// import { ReactComponent as ChallengeIcon } from "assets/icons/challenge.svg";
import { PostPayload, useCreatePostMutation } from "./api";
import useFileSelect, { maxFilesCount } from "./hooks/useFileSelect";
import useUploadHandler from "./hooks/useUploadHandler";
import Medium from "./Medium";
import useAuthDetails from "pages/auth/useAuthDetails";
// import { IoMdImages } from "react-icons/io";
// import { PiVideoFill } from "react-icons/pi";
import clsx from "clsx";
import { Challenge } from "services/challenge/api";

let initialUploadStarted = false;

export default function FeedPost({ challenge }: { challenge: Challenge | undefined }) {
  const [createPost] = useCreatePostMutation();
  const [isChallengePost, setIsChallengePost] = useState(false);
  const fileSelect = useFileSelect();
  const {
    files,
    setFiles,
    updateFiles,
    uploading,
    setUploading,
    nextFiles,
    setNextFiles,
    fileDropHandler,
    fileHoverHandler,
    fileLeaveHandler,
    fileHover,
  } = fileSelect as NonNullable<ReturnType<typeof useFileSelect>>;
  const uploadHandler = useUploadHandler(setFiles, setNextFiles, setUploading);
  const { mediaData, startUpload, successCount, mediaPayload, formSubmitted, setFormSubmitted } =
    uploadHandler;
  const { asset, isProfileCompleted } = useAuthDetails();
  const [content, setContent] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChallengePost(false);
    updateFiles(Array.from(e.target.files ?? []));
    e.target.value = "";
  };

  const handleChallengeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChallengePost(true);
    updateFiles(Array.from(e.target.files ?? []), true, () => setIsChallengePost(false));
    e.target.value = "";
  };

  useEffect(() => {
    if (initialUploadStarted) {
      return;
    }

    if (!mediaData) {
      return;
    }

    if (Object.keys(mediaData).length === files?.length) {
      startUpload(files);
      setUploading(true);
      initialUploadStarted = true;
    }
  }, [mediaData, files, startUpload, setUploading]);

  useEffect(() => {
    if (!files || !files.length) {
      initialUploadStarted = false;

      return;
    }

    if (!nextFiles) {
      return;
    }

    if (!mediaData) {
      return;
    }

    const newFilesAdded = files.some((file) => file.name === nextFiles[0].name);

    if (!newFilesAdded) {
      return;
    }

    if (Object.keys(mediaData).length === files.length) {
      startUpload(nextFiles, true);
      setUploading(true);
    }
  }, [nextFiles, mediaData, files, setUploading, startUpload]);

  const submitDisabled = useMemo(() => {
    if (files?.length) {
      return uploading || !successCount;
    }

    return !content;
  }, [uploading, successCount, files, content]);

  const challengePostDisabled = useMemo(() => {
    if (!!files?.length) {
      return true;
    }

    return false;
  }, [files]);

  const fileSelectDisabled = useMemo(() => {
    return files?.length == maxFilesCount;
  }, [files]);

  useEffect(() => {
    if (!formSubmitted) {
      return;
    }

    initialUploadStarted = false;
  }, [formSubmitted]);

  const handleSubmit = () => {
    const payload: PostPayload = {};

    if (content) payload.content = content;
    if (mediaPayload) payload.media = mediaPayload;
    if (isChallengePost) payload.challengeId = 3;

    createPost(payload).then(() => {
      setIsChallengePost(false);
      setFormSubmitted(true);
      setUploading(false);
      setContent("");
    });
  };

  return (
    <>
      <Stack direction="row" spacing={2} paddingX={2} paddingTop={4} paddingBottom={2}>
        <Avatar
          src={asset?.profilePictureUrl ? asset?.profilePictureUrl : Avartar1}
          alt="user"
          sx={{ width: 56, height: 56 }}
        />
        <Stack
          width="100%"
          height="fit-content"
          marginBottom={{ xs: 2, md: 5 }}
          // sx={{
          //   "&:has(fieldset.MuiOutlinedInput-notchedOutline)": {
          //     borderWidth: "2px",
          //     borderColor: theme.palette.blue
          //   },
          // }}
          onDragOver={fileHoverHandler}
          onDragLeave={fileLeaveHandler}
          onDrop={fileDropHandler}
          className={clsx(
            "border-gv-greyMinus3_F4F4F6 border-[1px] rounded-t-[33px] rounded-b-[33px]",
            fileHover && "border-gv-blue_1D69D8 border-[2px]"
          )}
        >
          <TextField
            placeholder="Start a post"
            fullWidth
            multiline
            onDragOver={fileHoverHandler}
            onDragLeave={fileLeaveHandler}
            onDrop={fileDropHandler}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    position="end"
                    sx={{
                      position: "relative",
                      bottom: "10px",
                      alignSelf: "end",
                      cursor: submitDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={submitDisabled}
                      onClick={handleSubmit}
                      sx={{
                        borderRadius: 17,
                        height: 32,
                        ":disabled": {
                          backgroundColor: "blueMinus4",
                          color: "grayMinus1",
                          cursor: "not-allowed",
                        },
                      }}
                    >
                      Send
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& fieldset": {
                border: "none",
              },
            }}
          />
          {!!files?.length && (
            <Grid
              container
              rowSpacing={{ xs: 1, sm: 2 }}
              columnSpacing={{ xs: 1, sm: 2 }}
              margin={2}
            >
              {files.map((file, index) => (
                <Medium
                  key={index}
                  file={file}
                  filesCount={files.length}
                  uploadHandler={uploadHandler}
                  setIsChallengePost={setIsChallengePost}
                />
              ))}
            </Grid>
          )}
        </Stack>
      </Stack>
      <div className="h-[0.5px] bg-[#F1F1F1] mb-1"></div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="center"
        spacing={{ sm: 2.5 }}
        pb={1}
        px={2}
        alignItems="center"
        className="md:!flex-row"
      >
        <div className="flex items-center justify-center space-x-6">
          <label
            htmlFor="image-upload"
            className={`${fileSelectDisabled || isChallengePost ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
          >
            <Button variant="text" className="flex items-center space-x-2 pointer-events-none">
              <UploadImageIcon />
              <Typography variant="p$14" className="font-medium text-senary">
                Upload Image
              </Typography>
            </Button>
            <input
              type="file"
              id="image-upload"
              onChange={handleChange}
              disabled={fileSelectDisabled || isChallengePost}
              accept={"image/jpg, image/jpeg, image/png"}
              className="hidden"
              multiple
            />
          </label>
          <label
            htmlFor="video-upload"
            className={`${fileSelectDisabled || isChallengePost ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
          >
            <Button variant="text" className="flex items-center space-x-2 pointer-events-none">
              <UploadVideoIcon />
              <Typography variant="p$14" className="font-medium text-senary">
                Upload Video
              </Typography>
            </Button>
            <input
              type="file"
              id="video-upload"
              onChange={handleChange}
              disabled={fileSelectDisabled || isChallengePost}
              accept={
                " video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-ms-wmv, video/x-flv, video/3gpp"
              }
              className="hidden"
              multiple
            />
          </label>
        </div>
        {challenge?.hasJoined && !challenge?.hasSubmitted && (
          <Tooltip
            title={!isProfileCompleted && "Complete profile to upload"}
            placement="top"
            arrow
          >
            <label
              htmlFor="challenge-video-upload"
              className={`${fileSelectDisabled || challengePostDisabled || !isProfileCompleted ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
            >
              {/* <Button variant="text" className="flex items-center space-x-2 pointer-events-none">
                <ChallengeIcon height={21} width={21} />
                <Typography variant="p$14" className="font-medium text-senary">
                  Upload to Challenge
                </Typography>
              </Button> */}
              <input
                type="file"
                id="challenge-video-upload"
                onChange={handleChallengeUpload}
                disabled={fileSelectDisabled || challengePostDisabled || !isProfileCompleted}
                accept={
                  " video/mp4, video/quicktime, video/x-ms-wmv, video/x-msvideo, video/x-ms-wmv, video/x-flv, video/3gpp"
                }
                className="hidden"
              />
            </label>
          </Tooltip>
        )}
      </Stack>
    </>
  );
}
