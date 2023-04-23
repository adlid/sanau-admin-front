import { createSlice } from "@reduxjs/toolkit";
import { userState } from "./user.state";
import { userProfileThunk } from "./user.thunks";

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userProfileThunk.fulfilled, (state, action: any) => {
      state.userProfile = action.payload;
    });
  },
});

export const userReducer = userSlice.reducer;
