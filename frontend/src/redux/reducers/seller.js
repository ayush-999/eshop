import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  successMessage: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase("LOGOUT_SELLER", (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      state.successMessage = null;
    })
    .addCase("UPDATE_SELLER", (state, action) => {
      state.user = action.payload;
      // state.successMessage = "Seller details updated successfully!";
      state.successMessage = null;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.successMessage = null;
    });
});
