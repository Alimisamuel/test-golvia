import axios, { AxiosResponse } from "axios";
import { SettingsPayload } from "models/settings";
import {
  ConfirmPasswordPayload,
  GooglePayload,
  LoginPayload,
  LoginResponse,
  OtpPayload,
  RegisterPayload,
  UserResponse,
  VerifyPayload,
} from "models/auth";

// Register user
const registerUser = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  country: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: RegisterPayload = { firstName, lastName, email, password, country };
  return axios.post<LoginResponse>("/auth/register", payload).catch((error) => {
    console.error(error.message); // Logs the custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Verify OTP
const verifyOtp = (email: string, otp: string): Promise<AxiosResponse<LoginResponse>> => {
  const payload: VerifyPayload = { email, otp };
  return axios.post<LoginResponse>("/auth/validateOTP", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

const resetPassword = (currentPassword: string): Promise<AxiosResponse<SettingsPayload>> => {
  const payload = { currentPassword };
  return axios.post<SettingsPayload>("/auth/reset-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};
const cofirmForgetPassword = (
  newPassword: string,
  confirmPassword: string,
  token: string
): Promise<AxiosResponse<LoginResponse>> => {
  const payload: ConfirmPasswordPayload = { newPassword, confirmPassword, token };
  return axios.post<LoginResponse>("/auth/confirm-forgot-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Resend OTP
const resendOtp = (): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>("/auth/resend-otp").catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

// Forgot password
const forgotPassword = (email: string): Promise<AxiosResponse<LoginResponse>> => {
  const payload: VerifyPayload = { email };
  return axios.post<LoginResponse>("/auth/forgot-password", payload).catch((error) => {
    console.error(error.message); // Logs custom error message for 500 error
    return Promise.reject(error); // Reject with the custom error message
  });
};

export { registerUser, verifyOtp, forgotPassword, cofirmForgetPassword, resendOtp, resetPassword };

/** --------------------REDUX API IMPLEMENTATION--------------------------- */

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

export async function login2Factor(data: OtpPayload): Promise<UserResponse | { error: string }> {
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
