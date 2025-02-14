import useUploadQueue, { initialQueue } from "./useUploadQueue";
import { Dispatch, RefObject, SetStateAction, useCallback, useEffect, useState } from "react";

export interface MediumData {
  file: File;
  values?: {
    type: "image" | "video";
    link: string;
    publicId: string;
  };
  error?: { message: string };
  imageRef: RefObject<HTMLImageElement>;
  progress: number;
  cancelUpload?: () => void;
}

export interface MediaData {
  [key: string]: MediumData;
}

export interface UploadHandler {
  mediaData: MediaData | null;
  setMediaData: Dispatch<SetStateAction<MediaData | null>>;
  startUpload: (files: File[] | null) => Promise<void>;
  cancelUpload: (file: File) => void;
  retryUpload: (file: File) => void;
  successCount: number;
  failureCount: number;
}

export default function useUploadHandler(
  setFiles: Dispatch<SetStateAction<File[] | null | undefined>>,
  setNextFiles: Dispatch<SetStateAction<File[] | null | undefined>>,
  setUploading: Dispatch<boolean>
) {
  const [mediaData, setMediaData] = useState<MediaData | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successCount, setSuccessCount] = useState<number>(0);
  const [failureCount, setFailureCount] = useState<number>(0);
  const [mediaPayload, setMediaPayload] = useState<NonNullable<MediumData["values"]>[]>();
  const updateMediaValue = useCallback((key: string, data: MediumData["values"]) => {
    setMediaData((prevData) => {
      if (!prevData) return null;
      if (!prevData?.[key]) return prevData;

      const updatedData = {
        ...prevData,
        [key]: {
          ...prevData[key],
          values: data,
        },
      };

      return updatedData;
    });
  }, []);

  const { add, cancel, completed, setQueue, retry } = useUploadQueue({
    mediaData,
    setMediaData,
    setFiles,
    updateMediaValue,
  });

  useEffect(() => {
    if (formSubmitted) {
      setMediaData(null);
      setFiles(null);
      setMediaPayload(undefined);
      setSuccessCount(0);
      setFailureCount(0);
      setQueue(initialQueue);
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  useEffect(() => {
    if (!mediaData) {
      setMediaPayload(undefined);
      return;
    }

    if (successCount !== completed.success.length) {
      setSuccessCount(completed.success.length);
    }

    if (failureCount !== completed.failure.length) {
      setFailureCount(completed.failure.length);
    }

    if (completed.success.length + completed.failure.length === Object.keys(mediaData).length) {
      setUploading(false);

      if (!completed.success.length) {
        setMediaPayload(undefined);
        return;
      }

      const media = completed.success.map((file) => {
        const mediumValues = mediaData[file.name]?.values;

        if (!mediumValues) {
          console.error("Media value update issue:", { mediaData, file: file.name });
        }

        return mediumValues as NonNullable<MediumData["values"]>;
      });

      setMediaPayload(media);
    }
  }, [
    completed.success.length,
    completed.failure.length,
    mediaData,
    setUploading,
    failureCount,
    successCount,
  ]);

  async function startUpload(files: File[] | null, isNextFiles?: boolean) {
    if (!files) {
      return;
    }

    if (isNextFiles) {
      setNextFiles(null);
    }

    add(Array.from(files));
  }

  return {
    mediaData,
    setMediaData,
    mediaPayload,
    startUpload,
    cancelUpload: cancel,
    retryUpload: retry,
    successCount,
    failureCount,
    formSubmitted,
    setFormSubmitted,
  };
}
