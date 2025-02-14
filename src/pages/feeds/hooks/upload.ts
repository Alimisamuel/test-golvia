import triggerUpload from "./triggerUpload";
import { MediaData, MediumData } from "./useUploadHandler";
import { SetStateAction } from "react";

export interface Upload {
  file: File;
  upload: () => Promise<void>;
  cancelledByError: () => boolean;
  cancelledByUser: () => boolean;
  cancelUpload: () => void;
  error?: { size: number };
}

export interface Props {
  file: File;
  mediumData: MediumData;
  setProgress: (key: string, { loaded, total }: { loaded: number; total: number }) => void;
  setMediaData: (value: SetStateAction<MediaData | null>) => void;
  updateMediaValue: (key: string, data: MediumData["values"]) => void;
}

export default async function upload({
  file,
  updateMediaValue,
  setProgress,
  setMediaData,
}: Props): Promise<Upload> {
  let cancelledByUser = false;
  let cancelledByError = false;

  const afterUserCancel = () => {
    setMediaData((prev) => {
      if (!prev) {
        return null;
      }
      const newMediaData = { ...prev };
      delete newMediaData[file.name];

      return newMediaData;
    });
  };

  const cancelUpload = async () => {
    cancelledByUser = true;
  };

  const setError = (key: string, error: string) => {
    setMediaData((prev) => {
      if (!prev) {
        return null;
      }

      return {
        ...prev,
        [key]: {
          ...prev[key],
          error: { message: error },
        },
      };
    });
  };

  return {
    file,
    cancelledByError: () => cancelledByError,
    cancelledByUser: () => cancelledByUser,
    cancelUpload,
    upload: async () => {
      const onError = (e: string) => {
        cancelledByError = true;
        setError(file.name, e);
      };
      await triggerUpload({
        file,
        onProgress: setProgress,
        cancelledByUser: () => cancelledByUser,
        afterUserCancel,
        updateMediaValue,
      }).catch((e) => {
        onError(e);
      });
    },
  };
}
