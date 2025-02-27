import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  AthleteProfilePayload,
  ClubProfilePayload,
  FanProfilePayload,
  OtherUsersPayload,
  Player,
  ScoutProfilePayload,
} from "models/profile";
import { LoginResponse, UserResponse } from "models/auth";
import { SettingsPayload } from "models/settings";
import apiClient from "api";

// Profile update payload interface
interface UpdateProfilePayload {
  email: string;
  profileType: string;
  sportType: string;
  teamName: string;
}

// Update profile type
const registrationType = (
  email: string,
  profileType: string,
  sportType: string,
  teamName: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: UpdateProfilePayload = { email, profileType, sportType, teamName };
  return apiClient.post<LoginResponse>("/auth/updateProfileType", payload).catch((error) => {
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
  return apiClient.post<AthleteProfilePayload>(`/api/users/create-profile`, payload).catch((error) => {
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
  return apiClient.post<ScoutProfilePayload>(`/api/users/create-profile`, payload).catch((error) => {
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

// ===================PROFILE=================================================================================================================================

const getOtherUserProfile = (email: string): Promise<AxiosResponse<OtherUsersPayload>> => {
  return apiClient.get<OtherUsersPayload>(`api/users/user-details?email=${email}&withMetaData=true`);
};
// const searchUsers = (email:any) : Promise<AxiosResponse<OtherUsersPayload>> =>{
//   return axios.get<OtherUsersPayload>(`api/users/user-details?email=${email}`)
// }
const getSettings = (): Promise<AxiosResponse<SettingsPayload>> => {
  return apiClient.get<SettingsPayload>(`api/settings`);
};
const getActivityStat = (): Promise<AxiosResponse> => {
  return apiClient.get(`api/activity-stats`);
};
const getProfileViewed = (): Promise<AxiosResponse> => {
  return apiClient.get(`api/users/viewers`);
};

export {
  registrationType,
  upgradeAtheleteProfile,
  upgradeScoutProfile,
  upgradeFanProfile,
  upgradeClubProfile,
  getOtherUserProfile,
  getSettings,
  editFanProfile,
  editClubProfile,
  editAtheleteProfile,
  updateCoverPhoto,
  getActivityStat,
  getProfileViewed,
};
