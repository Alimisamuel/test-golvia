import  { AxiosResponse } from "axios";
import { ConnectionApiResponse } from "models/network";
import  apiClient  from "api";

// ===================SETTINGS=================================================================================================================================
const toggle2faAuth = (has2FA: boolean): Promise<AxiosResponse<ConnectionApiResponse>> => {
  const payload = {
    has2FA,
  };
  return apiClient.patch<ConnectionApiResponse>(`/api/settings`, payload).catch((error) => {
    return Promise.reject(error);
  });
};

const getNotifications = (email: string): Promise<AxiosResponse> => {
  return apiClient.get(`/api/v1/settings/${email}`);
};

export { toggle2faAuth, getNotifications };
