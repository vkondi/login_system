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
    login: (state) => {
      state.authenticated = true;
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
    setUserDetails: (state, action) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, showLoader, hideLoader, setUserDetails } = authSlice.actions;

export default authSlice.reducer;
