import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LOGOUT_USER", (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.successMessage = null;
    })
    .addCase("UPDATE_USER", (state, action) => {
      state.user = action.payload;
      // state.successMessage = "User details updated successfully!";
      state.successMessage = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
