export interface RandomUsersPayload {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  profileType: string;
  sportType: string;
  teamName: string;
  active: boolean;
  profilePictureUrl: string;
  profileRealUrl: string;
  status: "CONNECT" | "PENDING";
  following: false | true;
  imageUrl: string;
  followers: number;
}

export interface UnconnectedUsersPayload {
  data: RandomUsersPayload[];
}

type ConnectionStatus = "PENDING" | "ACCEPTED" | "REJECTED";

interface ConnectionData {
  id: number;
  status: ConnectionStatus;
  fromEmail: string;
  toEmail: string;
  reason: string;
  createdAt: string;
  acceptedAt: string | null;
}

export interface ConnectionApiResponse {
  data: ConnectionData;
  message: string;
  errors: string[] | null;
  status: number;
  timestamp: string;
}