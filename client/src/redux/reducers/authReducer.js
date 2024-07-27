import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authenticated: true,
    username: "",
    name: "",
  },
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.authenticated = false;
    },
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, showLoader, hideLoader } = authSlice.actions;

export default authSlice.reducer;
