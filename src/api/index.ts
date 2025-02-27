import axios, { InternalAxiosRequestConfig } from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 120000,
});

// Request interceptor for adding token to headers
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userToken = localStorage.getItem("authToken");
    if (userToken && config.headers) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Request interceptor for handling FormData
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (config.data instanceof FormData && config.headers) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

// Response interceptor for custom error handling (500 errors)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      const errorMessage =
        "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.";
      return Promise.reject(new Error(errorMessage));
    }
    return Promise.reject(error);
  }
);

export default apiClient;
