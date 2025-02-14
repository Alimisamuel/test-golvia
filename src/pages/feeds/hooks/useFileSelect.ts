import useAlert from "components/alert/useAlert";
import { containsFiles } from "./util";
import { DragEvent, useState } from "react";

export const acceptedMediaTypes = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/x-flv",
  "video/3gpp",
];

export const maxFilesCount = 4;
const maxSize = 100000000; // 100MB - cloudinary max size

export default function useFileSelect() {
  const [files, setFiles] = useState<File[] | null>();
  const [fileHover, setFileHover] = useState<boolean>(false);
  const [nextFiles, setNextFiles] = useState<File[] | null>();
  const [uploading, setUploading] = useState(false);
  const handleAlert = useAlert();

  function fileHoverHandler(e: DragEvent<HTMLInputElement>) {
    e.stopPropagation();
    e.preventDefault();

    if (!containsFiles(e)) {
      e.dataTransfer.dropEffect = "none";

      return;
    }

    if (e.type === "drop") {
      setFileHover(false);
    } else {
      setFileHover(true);
    }

    e.dataTransfer.dropEffect = "copy";
  }

  function fileLeaveHandler(e: DragEvent<HTMLInputElement>) {
    e.stopPropagation();
    e.preventDefault();
    setFileHover(false);
  }

  function sizeExceeded(files: File[]) {
    return files.some((file) => {
      if (file.size > maxSize) {
        handleAlert({
          message: `You have exceeded the maximum size of ${maxSize / 1000000}MB per file \n on ${file.name}`,
          variant: "warning",
        });
        return true;
      }

      return false;
    });
  }

  function updateFiles(newFiles: File[] | null, isChallengePost?: boolean, onError?: () => void) {
    if (!newFiles) {
      return;
    }

    const filesCount = newFiles.length + (files?.length ?? 0);

    if (isChallengePost && filesCount > 1) {
      onError?.();
      handleAlert({
        message: "You can only upload 1 file to this challenge",
        variant: "warning",
      });
      return;
    }

    if (filesCount > maxFilesCount) {
      handleAlert({
        message: `You have exceeded the maximum of ${maxFilesCount} files per upload`,
        variant: "warning",
      });
      return;
    }

    let filteredNewFiles = newFiles;

    if (uploading || files?.length) {
      filteredNewFiles = newFiles.filter(
        (newFile) => !files?.find((file) => file.name === newFile.name)
      );

      if (!filteredNewFiles.length) {
        return;
      }

      if (sizeExceeded(filteredNewFiles)) {
        return;
      }

      setNextFiles(filteredNewFiles);
    }

    if (sizeExceeded(filteredNewFiles)) {
      return;
    }

    setFiles((prevFiles) => Array.from(filteredNewFiles).concat(prevFiles ?? []));
  }

  function fileDropHandler(e: DragEvent<HTMLInputElement>) {
    fileHoverHandler(e);

    const acceptedFiles = Array.from(e.dataTransfer.files).filter((file) => {
      const isAccepted = acceptedMediaTypes.some((type) => type === file.type);

      if (isAccepted) {
        return file;
      }
    });

    if (acceptedFiles.length !== e.dataTransfer.files.length) {
      handleAlert({
        message: "Some files are not supported",
        variant: "error",
      });
    }

    updateFiles(acceptedFiles);
  }

  return {
    files,
    setFiles,
    updateFiles,
    uploading,
    setUploading,
    nextFiles,
    setNextFiles,
    fileHoverHandler,
    fileDropHandler,
    fileLeaveHandler,
    fileHover,
    setFileHover,
  };
}
