import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  AthleteProfilePayload,
  ClubProfilePayload,
  ConnectionApiResponse,
  FanProfilePayload,
  OtherUsersPayload,
  Player,
  ScoutProfilePayload,
  SettingsPayload,
  UnconnectedUsersPayload,
} from "./types";
import { UserResponse } from "pages/auth/api";

// Base URL for the API
const baseUrl = process.env.REACT_APP_BASE_URL;

// Login response interface
interface LoginResponse {
  token: string;
  data: {
    fullname: string;
    firstName: string;
    email: string;
    user: {
      profileType: string;
      email: string;
      fullname: string;
      firstName: string;
    };
  };
}

// Register payload interface
interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}

// OTP verification payload interface
interface verifyPayload {
  email: string;
  otp?: string;
}

// Confirm password reset payload interface
interface confirmPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

// Profile update payload interface
interface updateProfilePayload {
  email: string;
  profileType: string;
  sportType: string;
  teamName: string;
}

// Create axios instance
const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 120000,
});

// Request interceptor for adding token to headers
apiClient.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const userToken = localStorage.getItem("authToken");

    if (userToken && config.headers) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
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
  (response) => {
    // If response is successful, return it
    return response;
  },
  (error) => {
    // Check if error is a 500 response
    if (error.response && error.response.status === 500) {
      // Return custom error message for 500 error
      const errorMessage =
        "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.";
      return Promise.reject(new Error(errorMessage));
    }

    // If not a 500 error, return the original error
    return Promise.reject(error);
  }
);

// API Call Functions

// Register user
const registerUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  country: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: RegisterPayload = { firstName, lastName, email, password, country };
  return apiClient.post<LoginResponse>("/auth/register", payload).catch((error) => {
    console.error(error.message); // Logs the custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Verify OTP
const verifyOtp = (email: string, otp: string): Promise<AxiosResponse<LoginResponse>> => {
  const payload: verifyPayload = { email, otp };
  return apiClient.post<LoginResponse>("/auth/validateOTP", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

const resetPassword = (currentPassword: string): Promise<AxiosResponse<SettingsPayload>> => {
  const payload = { currentPassword };
  return apiClient.post<SettingsPayload>("/auth/reset-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};
const cofirmForgetPassword = (
  newPassword: string,
  confirmPassword: string,
  token: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: confirmPasswordPayload = { newPassword, confirmPassword, token };
  return apiClient.post<LoginResponse>("/auth/confirm-forgot-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Resend OTP
const resendOtp = (): Promise<AxiosResponse<LoginResponse>> => {
  return apiClient.post<LoginResponse>("/auth/resend-otp").catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Update profile type
const registrationType = (
  email: string,
  profileType: string,
  sportType: string,
  teamName: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: updateProfilePayload = { email, profileType, sportType, teamName };
  return apiClient.post<LoginResponse>("/auth/updateProfileType", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Forgot password
const forgotPassword = (email: string): Promise<AxiosResponse<LoginResponse>> => {
  const payload: verifyPayload = { email };
  return apiClient.post<LoginResponse>("/auth/forgot-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Profile Upgrade (Athlete)
const upgradeAtheleteProfile = (
  address: string,
  dateOfBirth: string,
  yearsOfExperience: number,
  height: string,
  weight: string,
  biography: string,
  currentClub: string,
  preferredPosition: string,
  preferredFoot: string,
  preferredClub: string,
  profession: string,
  profilePictureUrl: string,
  profileReelUrl: string
): Promise<AxiosResponse<AthleteProfilePayload>> => {
  const payload: AthleteProfilePayload = {
    address,
    dateOfBirth,
    yearsOfExperience,
    height,
    weight,
    biography,
    currentClub,
    preferredPosition,
    preferredFoot,
    preferredClub,
    profession,
    asset: { profilePictureUrl, profileReelUrl },
  };
  return apiClient
    .post<AthleteProfilePayload>(`/api/users/create-profile`, payload)
    .catch((error) => {
      console.error(error.message); // Logs custom error message for 500 error
      return Promise.reject(error); // Reject with the custom error message
    });
};
const editAtheleteProfile = (
  address: string,
  dateOfBirth: string,
  yearsOfExperience: number,
  height: string,
  weight: string,
  biography: string,
  currentClub: string,
  preferredPosition: string,
  preferredFoot: string,
  preferredClub: string,
  profession: string,
  profilePictureUrl: string,
  profileReelUrl: string
): Promise<AxiosResponse<AthleteProfilePayload>> => {
  const payload: AthleteProfilePayload = {
    address,
    dateOfBirth,
    yearsOfExperience,
    height,
    weight,
    biography,
    currentClub,
    preferredPosition,
    preferredFoot,
    preferredClub,
    profession,
    asset: { profilePictureUrl, profileReelUrl },
  };
  return apiClient.patch<AthleteProfilePayload>(`/api/athletes`, payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Upgrade Scout Profile
const upgradeScoutProfile = (
  email: string,
  city: string,
  scoutingExperienceYears: number,
  areasOfSpecialization: string[],
  affiliatedOrganizations: string[],
  scoutingRegion: string[],
  certifications: string[],
  preferredAttributes: string,
  regionsOfInterest: string[],
  sports: string[],
  notesOnAthletes: string,
  position: string,
  ageGroup: string,
  scoutingHistory: string,
  phoneNumber: string,
  socialMediaLinks: string,
  profilePictureUrl: string,
  profileReelUrl: string
): Promise<AxiosResponse<ScoutProfilePayload>> => {
  const payload: ScoutProfilePayload = {
    username: "johnDoeScout",
    email,
    city,
    scoutingExperienceYears,
    notableTalents: [],
    areasOfSpecialization,
    affiliatedOrganizations,
    scoutingRegion,
    certifications,
    preferredAttributes,
    regionsOfInterest,
    sports,
    notesOnAthletes,
    position,
    ageGroup,
    scoutingHistory,
    phoneNumber,
    socialMediaLinks,
    isActive: true,
    asset: { profilePictureUrl, profileReelUrl },
  };
  return apiClient
    .post<ScoutProfilePayload>(`/api/users/create-profile`, payload)
    .catch((error) => {
      console.error(error.message); // Logs custom error message for 500 error
      return Promise.reject(error); // Reject with the custom error message
    });
};

// Upgrade Fan Profile
const upgradeFanProfile = (
  country: string,
  city: string,
  email: string,
  favoriteSports: string[],
  notificationPreferences: string[],
  interactions: string[],
  profilePictureUrl: string
): Promise<AxiosResponse<FanProfilePayload>> => {
  const payload: FanProfilePayload = {
    username: "",
    country,
    city,
    email,
    favoriteSports,
    favoriteAthletes: [""],
    notificationPreferences,
    interactions,
    purchasedItems: [""],
    asset: { profilePictureUrl, profileReelUrl: "" },
  };
  return apiClient.post<FanProfilePayload>(`/api/users/create-profile`, payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};
const editFanProfile = (
  country: string,
  city: string,
  email: string,
  favoriteSports: string[],
  notificationPreferences: string[],
  interactions: string[],
  profilePictureUrl: string
): Promise<AxiosResponse<FanProfilePayload>> => {
  const payload: FanProfilePayload = {
    username: "",
    country,
    city,
    email,
    favoriteSports,
    favoriteAthletes: [""],
    notificationPreferences,
    interactions,
    purchasedItems: [""],
    asset: { profilePictureUrl, profileReelUrl: "" },
  };
  return apiClient.patch<FanProfilePayload>(`/api/fans`, payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Upgrade Club Profile
const upgradeClubProfile = (
  clubName: string,
  country: string,
  city: string,
  competitionLevel: string,
  contactEmail: string,
  contactPersonName: string,
  contactPhone: string,
  website: string,
  socialLinks: string[],
  recruitmentAreas: string,
  playerType: string,
  teamLogoUrl: string,
  players: Player[],
  clubAchievements: string[],
  clubVacancies: string[],
  profilePictureUrl: string
): Promise<AxiosResponse<ClubProfilePayload>> => {
  const payload: ClubProfilePayload = {
    clubName,
    country,
    city,
    competitionLevel,
    contactEmail,
    contactPersonName,
    contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
    asset: { profilePictureUrl, profileReelUrl: "" },
  };
  return apiClient.post<ClubProfilePayload>(`/api/users/create-profile`, payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};
const editClubProfile = (
  id: number,
  clubName: string,
  country: string,
  city: string,
  competitionLevel: string,
  contactEmail: string,
  contactPersonName: string,
  contactPhone: string,
  website: string,
  socialLinks: string[],
  recruitmentAreas: string,
  playerType: string,
  teamLogoUrl: string,
  players: Player[],
  clubAchievements: string[],
  clubVacancies: string[],
  profilePictureUrl: string
): Promise<AxiosResponse<ClubProfilePayload>> => {
  const payload: ClubProfilePayload = {
    id,
    clubName,
    country,
    city,
    competitionLevel,
    contactEmail,
    contactPersonName,
    contactPhone,
    website,
    socialLinks,
    recruitmentAreas,
    playerType,
    teamLogoUrl,
    players,
    clubAchievements,
    clubVacancies,
    asset: { profilePictureUrl, profileReelUrl: "" },
  };
  return apiClient.patch<ClubProfilePayload>(`/api/clubs`, payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

const updateCoverPhoto = (url: string) => {
  const payload = {
    coverPhotoUrl: url,
  };

  return apiClient.patch<UserResponse>("/api/users/update-cover-photo", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// ===================FOLLOW & CONNECT =================================================================================================================================

const getUnConnectedUsers = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient
    .get<UnconnectedUsersPayload>("api/connections/unconnected-users?withMetaData=true")
    .catch((error) => {
      return Promise.reject(error); // Reject with the custom error message
    });
};
const getPendingUsers = (): Promise<AxiosResponse<UnconnectedUsersPayload>> => {
  return apiClient
    .get<UnconnectedUsersPayload>("api/connections/sent?withMetaData=true")
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

// ===================SETTINGS=================================================================================================================================
const toggle2faAuth = (has2FA: boolean): Promise<AxiosResponse<ConnectionApiResponse>> => {
  const payload = {
    has2FA,
  };
  return apiClient.patch<ConnectionApiResponse>(`/api/settings`, payload).catch((error) => {
    return Promise.reject(error);
  });
};

const getNotifications = (email:string) : Promise<AxiosResponse>  =>{
return apiClient.get(`/api/v1/settings/${email}`)
}

// ===================PROFILE=================================================================================================================================

const getOtherUserProfile = (email: string): Promise<AxiosResponse<OtherUsersPayload>> => {
  return apiClient.get<OtherUsersPayload>(
    `api/users/user-details?email=${email}&withMetaData=true`
  );
};
// const searchUsers = (email:any) : Promise<AxiosResponse<OtherUsersPayload>> =>{
//   return apiClient.get<OtherUsersPayload>(`api/users/user-details?email=${email}`)
// }
const getSettings = () : Promise<AxiosResponse<SettingsPayload>> =>{
  return apiClient.get<SettingsPayload>(`api/settings`)
}
const getActivityStat = () : Promise<AxiosResponse> =>{
  return apiClient.get(`api/activity-stats`)
}
const getProfileViewed = () : Promise<AxiosResponse> =>{
  return apiClient.get(`api/users/viewers`)
}

// MY REFERRALS 

const getReferalLink = (email:string) : Promise<AxiosResponse>=>{
  return apiClient.get(`api/referral/${email}/link`)
}

const submitReferral = (email:string, referralCodeUsed:string) : Promise<AxiosResponse> => {
return apiClient.post(`api/referral/register`,{email, referralCodeUsed})
}

const getMyReferrals = (referralCode:string) : Promise<AxiosResponse> => {
  return apiClient.get(`api/referral/${referralCode}`)
}


export { registerUser, verifyOtp, registrationType,upgradeAtheleteProfile , upgradeScoutProfile, upgradeFanProfile , upgradeClubProfile, getUnConnectedUsers, createConnection, getRecievedConnectedUsers, toggleFollow, toggle2faAuth, forgotPassword, cofirmForgetPassword, getTopClubs, getTopAgents, getTopAtheletes, acceptConnection, getPersonalNetwork, getOtherUserProfile, resendOtp, getSettings, resetPassword, removeNetwork, getPendingUsers, editFanProfile, editClubProfile, editAtheleteProfile, updateCoverPhoto, getActivityStat, getProfileViewed, getNotifications, getReferalLink, submitReferral, getMyReferrals};


