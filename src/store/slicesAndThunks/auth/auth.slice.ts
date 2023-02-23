import {
  createSlice,
  //PayloadAction
} from "@reduxjs/toolkit";
import { authState } from "./auth.state";

import { authAdmin } from "./auth.thunk";

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("role");
      state.isAuthenticated = false;
      state.role = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authAdmin.fulfilled, (state, action) => {
      const { roleName, privileges, fullName } = action.payload;
      state.role = roleName;
      state.fullName = fullName;
      state.privileges = JSON.stringify(privileges || []);
      state.isAuthenticated = true;
    });
  },
});

export const authReducers = authSlice.reducer;

export const { logOut } = authSlice.actions;
