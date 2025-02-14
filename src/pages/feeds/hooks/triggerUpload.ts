import { MediumData } from "./useUploadHandler";

interface Props {
  file: File;
  cancelledByUser: () => boolean;
  onProgress: (key: string, { loaded, total }: { loaded: number; total: number }) => void;
  afterUserCancel: () => void;
  updateMediaValue: (key: string, data: MediumData["values"]) => void;
}

export default function triggerUpload(props: Props) {
  const { file, onProgress, cancelledByUser, afterUserCancel, updateMediaValue } = props;
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`;
    const xhr = new XMLHttpRequest();

    const progressHandler = (e: ProgressEvent<XMLHttpRequestEventTarget>) => {
      if (e.lengthComputable) {
        onProgress(file.name, { loaded: e.loaded, total: e.total });
      } else {
        // Unable to compute progress information since the total size is unknown
      }
    };

    // poll constantly so the promise can be resolved if the user cancels it
    const cancelPoll = setInterval(() => {
      if (cancelledByUser()) {
        xhr.upload.removeEventListener("progress", progressHandler);
        resolve(null);
        afterUserCancel();
        clearInterval(cancelPoll);
      }
    }, 100);

    const fileType = file.type.split("/")[0];
    xhr.upload.addEventListener("progress", progressHandler);
    xhr.open("POST", `${url}/${fileType}/upload`);
    xhr.onerror = () => reject("Error uploading");

    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 400) {
        clearInterval(cancelPoll);
        reject("Try again");
      }

      const response = JSON.parse(xhr.response);

      updateMediaValue(file.name, {
        type: response.resource_type,
        link: response.secure_url,
        publicId: response.public_id,
      });

      resolve(null);
    };

    const type = file.type.includes("video") ? "video" : "image";
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string);
    formData.append("resource_type", type);
    xhr.send(formData);
  });
}
