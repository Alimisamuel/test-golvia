import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 120000,
});

apiClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.data instanceof FormData && config.headers) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}`;

// Updated uploadFileToCloudinary to handle progress tracking
const uploadFileToCloudinary = async (
  file: File,
  resourceType: "image" | "video",
  onProgress: (progress: number) => void
): Promise<AxiosResponse<any>> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET as string);
  formData.append("resource_type", resourceType);

  const response = await apiClient.post(`${cloudinaryUrl}/${resourceType}/upload`, formData, {
    onUploadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
  return response;
};

const uploadImageAndVideo = async (
  imageFile: File | null,
  videoFile: File | null,
  onProgress: (progress: number) => void
) => {
  try {
    const uploadPromises = [];

    if (imageFile) {
      uploadPromises.push(uploadFileToCloudinary(imageFile, "image", onProgress));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    if (videoFile) {
      uploadPromises.push(uploadFileToCloudinary(videoFile, "video", onProgress));
    } else {
      uploadPromises.push(Promise.resolve(null));
    }

    const [imageResponse, videoResponse] = await Promise.all(uploadPromises);

    return {
      imageUrl: imageResponse ? imageResponse.data.secure_url : null,
      videoUrl: videoResponse ? videoResponse.data.secure_url : null,
    };
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
};

export { uploadImageAndVideo };
