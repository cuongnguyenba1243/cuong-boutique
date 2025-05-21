import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utilities/authorizeAxios";

//Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
      userData,
    );

    return response.data.user;
  },
);

//Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
      userData,
    );

    return response.data.user;
  },
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const response = await authorizeAxiosInstance.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
  );

  return response.data;
});

export const verifyAccount = createAsyncThunk(
  "auth/verifyAccount",
  async ({ email, token }) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/verify`,
      { email, token },
    );

    return response.data;
  },
);

//Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Verify account
      .addCase(verifyAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
