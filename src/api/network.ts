import { AxiosResponse } from "axios";
import { ConnectionApiResponse, UnconnectedUsersPayload } from "models/network";
import apiClient from "api";

// ===================FOLLOW & CONNECT =================================================================================================================================

const getUnConnectedUsers = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient
    .get<UnconnectedUsersPayload>("api/connections/unconnected-users?withMetaData=true")
    .catch((error) => {
      return Promise.reject(error); // Reject with the custom error message
    });
};
const getPendingUsers = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/connections/sent?withMetaData=true")
    .catch((error) => {
      return Promise.reject(error); // Reject with the custom error message
    });
};

const getRecievedConnectedUsers = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/connections/received").catch((error) => {
    return Promise.reject(error);
  });
};
const getTopClubs = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/clubs/top/clubs").catch((error) => {
    return Promise.reject(error);
  });
};
const getTopAgents = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/clubs/top/agents").catch((error) => {
    return Promise.reject(error);
  });
};
const getTopAtheletes = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/clubs/top-athletes").catch((error) => {
    return Promise.reject(error);
  });
};
const getPersonalNetwork = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient.get<UnconnectedUsersPayload>("api/connections/networks").catch((error) => {
    return Promise.reject(error);
  });
};

const createConnection = (email: string): Promise<AxiosResponse<ConnectionApiResponse>> => {
  const payload = {
    email,
  };
  return apiClient.post<ConnectionApiResponse>(`api/connections/send`, payload).catch((error) => {
    return Promise.reject(error);
  });
};
const acceptConnection = (email: string): Promise<AxiosResponse<ConnectionApiResponse>> => {
  const payload = {
    email,
  };
  return apiClient.post<ConnectionApiResponse>(`api/connections/accept`, payload).catch((error) => {
    return Promise.reject(error);
  });
};
const toggleFollow = (email: string): Promise<AxiosResponse<ConnectionApiResponse>> => {
  const payload = {
    email,
  };
  return apiClient
    .post<ConnectionApiResponse>(`/api/follows/toggle?followerEmail=${email}`, payload)
    .catch((error) => {
      return Promise.reject(error);
    });
};
const removeNetwork = (email: string): Promise<AxiosResponse<ConnectionApiResponse>> => {
  return apiClient
    .delete<ConnectionApiResponse>(`/api/connections/remove?email=${email}`)
    .catch((error) => {
      return Promise.reject(error);
    });
};

export {
  getUnConnectedUsers,
  createConnection,
  getRecievedConnectedUsers,
  toggleFollow,
  getTopClubs,
  getTopAgents,
  getTopAtheletes,
  acceptConnection,
  getPersonalNetwork,
  getPendingUsers,
  removeNetwork,
};
