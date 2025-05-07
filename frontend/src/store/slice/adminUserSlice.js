import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authorizeAxiosInstance from "../../utilities/authorizeAxios";

//Fetch all user by admin
export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async ({ page, limit }) => {
    const response = await authorizeAxiosInstance.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users?page=${page}&limit=${limit}`,
    );

    return response.data;
  },
);

//Add new user by admin
export const addUser = createAsyncThunk(
  "admin/addUser",
  async ({ name, email, password, role }) => {
    const response = await authorizeAxiosInstance.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
      { name, email, password, role },
    );

    return response.data;
  },
);

//Update user info by admin
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role, password }) => {
    const response = await authorizeAxiosInstance.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { name, email, role, password },
    );

    return response.data.updatedUser;
  },
);

//Delete user by admin
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await authorizeAxiosInstance.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
  );

  return id;
});

//Slice
const adminUserSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Add new user
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //Update an user
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const userIndex = state.users.findIndex(
          (user) => user._id === updatedUser._id,
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      //Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { setPage } = adminUserSlice.actions;

export default adminUserSlice.reducer;
