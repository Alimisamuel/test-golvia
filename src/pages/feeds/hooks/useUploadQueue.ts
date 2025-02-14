import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import upload, { Upload } from "./upload";
import { MediaData, MediumData } from "./useUploadHandler";

interface ProgressBar {
  uploading: { size: number };
  success: { size: number };
  error: { size: number };
}

interface Listener {
  ({ success, error, uploading }: ProgressBar): void;
}

interface Queue {
  completed: { success: File[]; failure: File[] };
  waiting: File[];
}

let listeners: Listener[] = [];
export const initialQueue: Queue = {
  completed: { success: [], failure: [] },
  waiting: [],
};

export default function useUploadQueue({
  mediaData,
  setMediaData,
  setFiles,
  updateMediaValue,
}: {
  mediaData: MediaData | null;
  setMediaData: Dispatch<SetStateAction<MediaData | null>>;
  setFiles: Dispatch<SetStateAction<File[] | null | undefined>>;
  updateMediaValue: (key: string, mediumData: MediumData["values"]) => void;
}) {
  const [queue, setQueue] = useState(initialQueue);

  function listen(cb: Listener) {
    listeners.push(cb);

    return () => {
      listeners = listeners.filter((listener) => listener !== cb);
    };
  }

  function removeFileFromAllQueues(file: File, shouldRetry?: true) {
    const mutableQueue = queue;
    const waitingIndex = queue.waiting.findIndex((f) => f === file);

    if (waitingIndex >= 0) {
      mutableQueue.waiting.splice(waitingIndex, 1);
      setQueue(mutableQueue);
    }

    const failureIndex = queue.completed.failure.findIndex((data) => data === file);

    if (failureIndex >= 0) {
      mutableQueue.completed.failure.splice(failureIndex, 1);
      setQueue(mutableQueue);
    } else {
      const successIndex = queue.completed.success.findIndex((data) => data === file);

      if (successIndex >= 0) {
        mutableQueue.completed.success.splice(successIndex, 1);
        setQueue(mutableQueue);
      }
    }

    if (shouldRetry) {
      return;
    }

    setFiles((prevFiles) => {
      if (!prevFiles) {
        return;
      }

      const files = [...prevFiles];
      const fileIndex = files.findIndex((f) => f === file);

      files.splice(fileIndex, 1);

      return files;
    });

    mediaData?.[file.name].cancelUpload?.();
  }

  const triggerUploads = useCallback(
    async (filesUpNext: File[]) => {
      setQueue((prevQueue) => ({
        ...prevQueue,
        waiting: [],
      }));

      const setProgress = (key: string, { loaded, total }: { loaded: number; total: number }) => {
        if (!mediaData) {
          return;
        }

        const percentComplete = (loaded / total) * 100;
        setMediaData((prev) => {
          if (!prev) {
            return null;
          }

          const data: { progress: number; error?: undefined } = {
            progress: Math.round(percentComplete),
          };

          if (prev[key].error) {
            // LOOK INTO - Cannot read properties of undefined (reading 'error')
            data.error = undefined;
          }

          return {
            ...prev,
            [key]: { ...prev[key], ...data },
          };
        });
      };

      const uploadsUpNext = await Promise.all(
        filesUpNext.map((file) => {
          if (!mediaData) {
            return;
          }

          return upload({
            file,
            mediumData: mediaData[file.name],
            setProgress,
            setMediaData,
            updateMediaValue,
          });
        })
      );

      await Promise.all(
        uploadsUpNext.map(async (data: Upload | undefined) => {
          if (!data) {
            return;
          }

          if (!mediaData) return;

          setMediaData((prev) => {
            if (!prev) {
              return null;
            }

            return {
              ...prev,
              [data.file.name]: {
                ...prev[data.file.name],
                cancelUpload: data.cancelUpload,
              },
            };
          });

          await data.upload().then(() => {
            if (data.cancelledByUser()) {
              return;
            }

            if (data.cancelledByError()) {
              setQueue((prevQueue) => ({
                ...prevQueue,
                waiting: [],
                completed: {
                  ...prevQueue.completed,
                  failure: [...prevQueue.completed.failure, data.file],
                },
              }));
            } else {
              setQueue((prevQueue) => ({
                ...prevQueue,
                waiting: [],
                completed: {
                  ...prevQueue.completed,
                  success: [...prevQueue.completed.success, data.file],
                },
              }));
            }
          });
        })
      ); //   if (!data) {
      //     return;
      //   }

      //   if (!mediaData) return;

      //   if (data.cancelledByUser()) {
      //     return;
      //   }

      //   if (data.cancelledByError()) {
      //     setQueue((prevQueue) => ({
      //       ...prevQueue,
      //       waiting: [],
      //       completed: {
      //         ...prevQueue.completed,
      //         failure: [...prevQueue.completed.failure, data.file],
      //       },
      //     }));
      //   } else {
      //     setQueue((prevQueue) => ({
      //       ...prevQueue,
      //       waiting: [],
      //       completed: {
      //         ...prevQueue.completed,
      //         success: [...prevQueue.completed.success, data.file],
      //       },
      //     }));
      //   }
      // });
    },
    [mediaData, setMediaData, setQueue, updateMediaValue]
  );

  useEffect(() => {
    if (queue.waiting.length <= 0) {
      return;
    }

    triggerUploads(queue.waiting);
  }, [queue.waiting, triggerUploads]);

  async function add(files: File[]) {
    if (files.length <= 0) {
      return;
    }

    setQueue((prevQueue) => ({
      ...prevQueue,
      waiting: [...prevQueue.waiting, ...files],
    }));
  }

  async function retry(file: File) {
    removeFileFromAllQueues(file, true);
    add([file]);
  }

  function cancel(file: File) {
    removeFileFromAllQueues(file);
  }

  return {
    listen,
    add,
    cancel,
    retry,
    completed: queue.completed,
    setQueue,
  };
}
