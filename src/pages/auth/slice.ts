import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import {
  CurrentUser,
  login,
  LoginPayload,
  register,
  RegisterPayload,
  update,
  loginWithGoogle,
  GooglePayload,
  signUpWithGoogle,
  login2Factor,
  otpPayload,
} from "./api";

export interface AuthState {
  data: CurrentUser | null;
  loading: boolean;
  error: string | null;
  token: string | null;
  fullResponse: { user: CurrentUser; token: string } | null;
}

const initialState: AuthState = {
  data: JSON.parse(localStorage.getItem("user") || "null"),
  loading: false,
  error: null,
  token: localStorage.getItem("authToken"),
  fullResponse: null,
};

export const registerAsync = createAsyncThunk("auth/register", async (payload: RegisterPayload) => {
  const response = await register(payload);
  return response.data;
});
export const registerGoogleAsync = createAsyncThunk(
  "auth/signUpWithGoogle",
  async (payload: GooglePayload) => {
    const response = await signUpWithGoogle(payload);
    // Check if the response contains an error
    if ("error" in response) {
      // If error is present, handle it accordingly, such as returning the error
      throw new Error(response.error); // You can throw the error or handle it as needed
    }

    // If no error, proceed to extract token and user data
    const token = response.token;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(response.data)); // Store the user data in localStorage

    return { user: response.data, token };
  }
);

export const loginAsync = createAsyncThunk("auth/login", async (payload: LoginPayload) => {
  const response = await login(payload);

  // Check if the response contains an error
  if ("error" in response) {
    // If error is present, handle it accordingly, such as returning the error
    throw new Error(response.error); // You can throw the error or handle it as needed
  }

  // If no error, proceed to extract token and user data
  const token = response.token;
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(response.data)); // Store the user data in localStorage

  return { user: response.data, token };
});

export const login2FactorAsync = createAsyncThunk(
  "auth/validateOTP",
  async (payload: otpPayload) => {
    const response = await login2Factor(payload);
    // Check if the response contains an error
    if ("error" in response) {
      // If error is present, handle it accordingly, such as returning the error
      throw new Error(response.error); // You can throw the error or handle it as needed
    }

    // If no error, proceed to extract token and user data
    const token = response.token;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(response.data)); // Store the user data in localStorage

    return { user: response.data, token };
  }
);

export const loginWithGoogleAsync = createAsyncThunk(
  "auth/loginWithGoogle",
  async (payload: GooglePayload) => {
    const response = await loginWithGoogle(payload);
    // Check if the response contains an error
    if ("error" in response) {
      // If error is present, handle it accordingly, such as returning the error
      throw new Error(response.error); // You can throw the error or handle it as needed
    }

    // If no error, proceed to extract token and user data
    const token = response.token;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(response.data)); // Store the user data in localStorage

    return { user: response.data, token };
  }
);

export const updateAsync = createAsyncThunk("auth/update", async (_, { rejectWithValue }) => {
  try {
    const response = await update();
    const updatedUser = response.data;

    localStorage.setItem("user", JSON.stringify(updatedUser));

    return updatedUser;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to update user details");
  }
});

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("authToken"); // Remove token from localStorage on logout
      localStorage.removeItem("user"); // Remove user data from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to register";
      })

      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.fullResponse = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })
      .addCase(login2FactorAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(login2FactorAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.token = action.payload.token;
        state.fullResponse = action.payload;
      })
      .addCase(login2FactorAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })

      .addCase(registerGoogleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerGoogleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerGoogleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })
      .addCase(loginWithGoogleAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogleAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginWithGoogleAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      })

      .addCase(updateAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Update the user data in the store
      })
      .addCase(updateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logOut } = slice.actions;

export default slice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectToken = (state: RootState) => state.auth.token;
