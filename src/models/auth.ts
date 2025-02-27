import {
  AthleteProfilePayload,
  ClubProfilePayload,
  FanProfilePayload,
  ScoutProfilePayload,
} from "./profile";

// Login response interface
export interface LoginResponse {
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
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
}

// OTP verification payload interface
export interface VerifyPayload {
  email: string;
  otp?: string;
}

// Confirm password reset payload interface
export interface ConfirmPasswordPayload {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

export interface UserPayload {
  user: {
    firstName: string;
    profileType: string;
    sportType: string;
    email: string;
    lastName: string;
    id: number;
    token: string;
    country: string;
  };
  profile:
    | ({
        address: string;
        currentClub: string;
        preferredPosition: string;
        dateOfBirth: string;
        height: string;
        weight: string;
        biography: string;
        profession: string;
        preferredClub: string;
        preferredFoot: string;
        yearsOfExperience: string;
      } & ScoutProfilePayload &
        FanProfilePayload &
        ClubProfilePayload &
        AthleteProfilePayload)
    | null;
  asset: {
    profilePictureUrl: string;
    profileReelUrl: string;
    coverPhotoUrl: string;
  } | null;
  metadata: {
    isFollowing: boolean;
    isConnected: boolean;
    connectionsCount: number;
    followersCount: number;
  } | null;
  connections: number;
  followers: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface GooglePayload {
  iss: string;
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  locale: string;
}
export type CurrentUser = UserPayload;

export interface UserResponse {
  data: CurrentUser;
  token: string;
}