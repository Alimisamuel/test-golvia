import {
  AthleteProfilePayload,
  ClubProfilePayload,
  FanProfilePayload,
  ScoutProfilePayload,
} from "api/types";

export interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
  country: string;
  token: string;
}
export interface userPayload {
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
export interface otpPayload {
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
export type CurrentUser = userPayload;

export interface UserResponse {
  data: CurrentUser;
  token: string;
}

const API_BASE_URL = process.env.REACT_APP_BASE_URL;

export async function register(data: RegisterPayload): Promise<UserResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to register");
  }
  return response.json();
}

export async function login(data: LoginPayload): Promise<UserResponse | { error: string }> {
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log(response, "Response");
        const errorData = await response.json();
        return {
          error:
            errorData.message ||
            "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
        };
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Network or server error:", error);
      return {
        error:
          "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
      };
    });
}

export async function login2Factor(data: otpPayload): Promise<UserResponse | { error: string }> {
  return fetch(`${API_BASE_URL}/auth/validateOTP`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log(response, "Response");
        const errorData = await response.json();
        return {
          error:
            errorData.message ||
            "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
        };
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Network or server error:", error);
      return {
        error:
          "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
      };
    });
}

export async function loginWithGoogle(
  data: GooglePayload
): Promise<UserResponse | { error: string }> {
  return fetch(`${API_BASE_URL}/google-auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-google-auth-type": "SIGN_UP",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log(response, "Response");
        const errorData = await response.json();
        return {
          error:
            errorData.message ||
            "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
        };
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Network or server error:", error);
      return {
        error:
          "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
      };
    });
}
export async function signUpWithGoogle(
  data: GooglePayload
): Promise<UserResponse | { error: string }> {
  return fetch(`${API_BASE_URL}/google-auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-google-auth-type": "SIGN_UP",
    },
    body: JSON.stringify(data),
  })
    .then(async (response) => {
      if (!response.ok) {
        console.log(response, "Response");
        const errorData = await response.json();
        return {
          error:
            errorData.message ||
            "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
        };
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Network or server error:", error);
      return {
        error:
          "We apologize for the inconvenience. We are working to resolve the issue. Please try again later.",
      };
    });
}

// Update user information (details needed)
export async function update(): Promise<UserResponse> {
  const userToken = localStorage.getItem("authToken");

  if (!userToken) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${API_BASE_URL}/api/users/user-details?withMetaData=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // Add Bearer token here
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}

// Log out user (details needed)
export function logOut() {
  // Implement this function
}
