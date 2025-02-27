import { UserPayload } from "models/auth";

export interface UserAsset {
  profilePictureUrl: string;
  profileReelUrl: string;
}

export interface AthleteProfilePayload {
  address: string;
  dateOfBirth: string;
  yearsOfExperience: number;
  height: string;
  weight: string;
  biography: string;
  currentClub: string;
  preferredPosition: string;
  preferredFoot: string;
  preferredClub: string;
  profession: string;
  asset: UserAsset;
  email?: string;
  user?: string;
  dateCreated?: string;
}

export interface ScoutProfilePayload {
  username: string;
  email: string;
  city: string;
  scoutingExperienceYears: number;
  notableTalents: string[];
  areasOfSpecialization: string[];
  affiliatedOrganizations: string[];
  scoutingRegion: string[];
  certifications: string[];
  preferredAttributes: string;
  regionsOfInterest: string[];
  sports: string[];
  notesOnAthletes: string;
  position: string;
  ageGroup: string;
  scoutingHistory: string;
  phoneNumber: string;
  socialMediaLinks: string;
  isActive: boolean;
  asset: UserAsset;
}

export interface FanProfilePayload {
  username: string;
  country: string;
  city: string;
  email: string;
  favoriteSports: string[];
  favoriteAthletes: string[];
  notificationPreferences: string[];
  interactions: string[];
  purchasedItems: string[];
  asset: UserAsset;
}

export interface ClubProfilePayload {
  id?: number;
  clubName: string;
  country: string;
  city: string;
  competitionLevel: string;
  contactEmail: string;
  contactPersonName: string;
  contactPhone: string;
  website: string;
  socialLinks: string[];
  recruitmentAreas: string;
  playerType: string;
  teamLogoUrl: string;
  players: Player[];
  clubAchievements: string[];
  clubVacancies: string[];
  asset: UserAsset;
}

export interface Player {
  playerName: string;
  playerPosition: string;
}

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
export interface OtherUsersPayload {
  data: UserPayload;
}